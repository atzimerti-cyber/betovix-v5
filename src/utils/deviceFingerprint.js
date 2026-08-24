const INSTALLATION_ID_STORAGE_KEY = 'module.device.installation-id.v1';
const INDEXED_DB_NAME = 'module-device-identity';
const INDEXED_DB_STORE = 'device';
const INDEXED_DB_RECORD_KEY = 'installation-id';
const CLIENT_FINGERPRINT_VERSION = 'client-v1';
const BROWSER_FINGERPRINT_VERSION = 'browser-v1';

let telemetryPromise;

const canUseBrowserApis = () => typeof window !== 'undefined' && typeof navigator !== 'undefined';

const normalize = (value) => String(value ?? '').trim().toLowerCase();

const readLocalStorage = () => {
    if (!canUseBrowserApis()) return null;

    try {
        return window.localStorage.getItem(INSTALLATION_ID_STORAGE_KEY);
    } catch {
        return null;
    }
};

const writeLocalStorage = (value) => {
    if (!canUseBrowserApis()) return;

    try {
        window.localStorage.setItem(INSTALLATION_ID_STORAGE_KEY, value);
    } catch {
        // Storage can be unavailable in private/restricted browser contexts.
    }
};

const openDeviceDatabase = () => {
    if (!canUseBrowserApis() || !window.indexedDB) return Promise.resolve(null);

    return new Promise((resolve) => {
        let request;

        try {
            request = window.indexedDB.open(INDEXED_DB_NAME, 1);
        } catch {
            resolve(null);
            return;
        }

        request.onupgradeneeded = () => {
            const database = request.result;
            if (!database.objectStoreNames.contains(INDEXED_DB_STORE)) {
                database.createObjectStore(INDEXED_DB_STORE);
            }
        };

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
        request.onblocked = () => resolve(null);
    });
};

const readIndexedDb = async () => {
    const database = await openDeviceDatabase();
    if (!database) return null;

    return new Promise((resolve) => {
        try {
            const transaction = database.transaction(INDEXED_DB_STORE, 'readonly');
            const request = transaction.objectStore(INDEXED_DB_STORE).get(INDEXED_DB_RECORD_KEY);

            request.onsuccess = () => resolve(typeof request.result === 'string' ? request.result : null);
            request.onerror = () => resolve(null);
            transaction.oncomplete = () => database.close();
            transaction.onerror = () => database.close();
            transaction.onabort = () => database.close();
        } catch {
            database.close();
            resolve(null);
        }
    });
};

const writeIndexedDb = async (value) => {
    const database = await openDeviceDatabase();
    if (!database) return;

    await new Promise((resolve) => {
        try {
            const transaction = database.transaction(INDEXED_DB_STORE, 'readwrite');
            transaction.objectStore(INDEXED_DB_STORE).put(value, INDEXED_DB_RECORD_KEY);
            transaction.oncomplete = resolve;
            transaction.onerror = resolve;
            transaction.onabort = resolve;
        } catch {
            resolve();
        }
    });

    database.close();
};

const createUuid = () => {
    if (canUseBrowserApis() && window.crypto?.randomUUID) {
        return window.crypto.randomUUID();
    }

    if (canUseBrowserApis() && window.crypto?.getRandomValues) {
        const bytes = new Uint8Array(16);
        window.crypto.getRandomValues(bytes);
        bytes[6] = (bytes[6] & 0x0f) | 0x40;
        bytes[8] = (bytes[8] & 0x3f) | 0x80;

        const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
        return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
    }

    // Last-resort fallback for old browsers. It is not used when Web Crypto is available.
    return `legacy-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`;
};

export const getOrCreateInstallationId = async () => {
    const localValue = readLocalStorage();
    if (localValue) {
        void writeIndexedDb(localValue);
        return localValue;
    }

    const indexedDbValue = await readIndexedDb();
    if (indexedDbValue) {
        writeLocalStorage(indexedDbValue);
        return indexedDbValue;
    }

    const installationId = createUuid();
    writeLocalStorage(installationId);
    await writeIndexedDb(installationId);
    return installationId;
};

const sha256 = async (value) => {
    if (!canUseBrowserApis() || !window.crypto?.subtle || typeof TextEncoder === 'undefined') {
        return null;
    }

    const bytes = new TextEncoder().encode(value);
    const digest = await window.crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, '0')).join('');
};

const detectDeviceType = () => {
    if (!canUseBrowserApis()) return 'unknown';

    const userAgent = navigator.userAgent || '';
    const isTablet = /ipad|tablet|playbook|silk/i.test(userAgent)
        || (navigator.maxTouchPoints > 1 && /macintosh/i.test(userAgent));
    if (isTablet) return 'tablet';
    if (/mobi|android|iphone|ipod/i.test(userAgent)) return 'mobile';
    return 'desktop';
};

const detectBrowser = () => {
    if (!canUseBrowserApis()) return 'unknown';

    const userAgent = navigator.userAgent || '';
    if (/edg\//i.test(userAgent)) return 'Edge';
    if (/opr\//i.test(userAgent)) return 'Opera';
    if (/firefox\//i.test(userAgent)) return 'Firefox';
    if (/chrome\//i.test(userAgent) && !/chromium/i.test(userAgent)) return 'Chrome';
    if (/safari\//i.test(userAgent) && !/chrome|chromium|android/i.test(userAgent)) return 'Safari';
    return 'Other';
};

const detectOperatingSystem = () => {
    if (!canUseBrowserApis()) return 'unknown';

    const userAgent = navigator.userAgent || '';
    const platform = navigator.userAgentData?.platform || navigator.platform || '';
    const value = `${platform} ${userAgent}`;

    if (/windows|win32|win64/i.test(value)) return 'Windows';
    if (/iphone|ipad|ipod/i.test(value)) return 'iOS';
    if (/android/i.test(value)) return 'Android';
    if (/mac/i.test(value)) return 'macOS';
    if (/linux/i.test(value)) return 'Linux';
    return 'Other';
};

const getTimezone = () => {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    } catch {
        return '';
    }
};

const buildBrowserSignalPayload = () => {
    if (!canUseBrowserApis()) return '';

    const screenInfo = window.screen
        ? `${window.screen.width}x${window.screen.height}x${window.screen.colorDepth}`
        : '';

    return [
        `ua=${normalize(navigator.userAgent)}`,
        `platform=${normalize(navigator.userAgentData?.platform || navigator.platform)}`,
        `languages=${normalize((navigator.languages || [navigator.language]).join(','))}`,
        `timezone=${normalize(getTimezone())}`,
        `screen=${normalize(screenInfo)}`,
        `cores=${normalize(navigator.hardwareConcurrency)}`,
        `memory=${normalize(navigator.deviceMemory)}`,
        `touch=${normalize(navigator.maxTouchPoints)}`,
        `device=${normalize(detectDeviceType())}`,
        `browser=${normalize(detectBrowser())}`,
        `os=${normalize(detectOperatingSystem())}`,
    ].join('\n');
};

export const getBrowserFingerprint = async () => {
    const payload = buildBrowserSignalPayload();
    if (!payload) return null;

    const digest = await sha256(payload);
    return digest ? `${BROWSER_FINGERPRINT_VERSION}:${digest}` : null;
};

const buildDeviceTelemetry = async () => {
    if (!canUseBrowserApis()) return {};

    const installationId = await getOrCreateInstallationId();
    const siteScope = normalize(window.location.hostname || 'unknown-site');
    const deviceDigest = await sha256(`${siteScope}\n${installationId}`);
    const browserFingerprint = await getBrowserFingerprint();

    const headers = {
        'X-Device-Id': installationId,
        'X-Device-Type': detectDeviceType(),
        'X-Browser': detectBrowser(),
        'X-Operating-System': detectOperatingSystem(),
        'X-Language': navigator.language || '',
    };

    if (deviceDigest) {
        headers['X-Device-Fingerprint'] = `${CLIENT_FINGERPRINT_VERSION}:${deviceDigest}`;
    } else {
        // Old browsers without SubtleCrypto still get a stable, non-secret installation identifier.
        headers['X-Device-Fingerprint'] = `${CLIENT_FINGERPRINT_VERSION}:${installationId}`;
    }

    if (browserFingerprint) {
        headers['X-Client-Fingerprint'] = browserFingerprint;
    }

    return headers;
};

export const getDeviceTelemetryHeaders = async () => {
    if (!telemetryPromise) {
        telemetryPromise = buildDeviceTelemetry().catch(() => ({}));
    }

    return telemetryPromise;
};
