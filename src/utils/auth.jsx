import { jwtDecode } from 'jwt-decode';
import { refreshAuthToken } from '../pages/Login/loginAsyncActions';

const AUTH_STORAGE_MODE_KEY = 'authStorageMode';
const AUTH_STORAGE_MODE_SESSION = 'session';

const TOKEN_KEYS = ['accessToken', 'refreshToken', 'refreshDate'];

function isSessionAuthMode() {
    return localStorage.getItem(AUTH_STORAGE_MODE_KEY) === AUTH_STORAGE_MODE_SESSION;
}

function getAuthStorage() {
    return isSessionAuthMode() ? sessionStorage : localStorage;
}

function moveTokens(fromStorage, toStorage) {
    TOKEN_KEYS.forEach((key) => {
        const value = fromStorage.getItem(key);

        if (value !== null) {
            toStorage.setItem(key, value);
            fromStorage.removeItem(key);
        }
    });
}

export function setAuthStorageMode(isSessionMode) {
    if (isSessionMode) {
        localStorage.setItem(AUTH_STORAGE_MODE_KEY, AUTH_STORAGE_MODE_SESSION);
        moveTokens(localStorage, sessionStorage);
        return;
    }

    localStorage.removeItem(AUTH_STORAGE_MODE_KEY);
    moveTokens(sessionStorage, localStorage);
}

export function getAccessToken() {
    const storage = getAuthStorage();
    const accessToken = storage.getItem('accessToken');

    let decoded;
    if (accessToken) {
        try {
            const now = Date.now() / 1000;
            decoded = jwtDecode(accessToken);
            const exp = decoded.exp;

            if (exp < now) {
                removeTokens();
                return null;
            }
        } catch (error) {
            removeTokens();
            return null;
        }
    }

    return accessToken;
}

export function getRefreshToken() {
    const refreshToken = getAuthStorage().getItem('refreshToken');
    return refreshToken;
}

export function setTokens(accessToken, refreshToken, refreshDate) {
    const storage = getAuthStorage();

    storage.setItem('accessToken', accessToken);
    storage.setItem('refreshToken', refreshToken);

    if (refreshDate) storage.setItem('refreshDate', refreshDate);
}

export function setAccessToken(accessToken) {
    getAuthStorage().setItem('accessToken', accessToken);
}

export function removeTokens() {
    TOKEN_KEYS.forEach((key) => {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
    });
}

let refreshTimer = null;

function resolveExpiresInSeconds(expiresIn) {
    const parsedExpiresIn = Number(expiresIn);
    if (Number.isFinite(parsedExpiresIn) && parsedExpiresIn > 0) {
        return parsedExpiresIn;
    }

    const accessToken = getAuthStorage().getItem('accessToken');
    if (!accessToken) return null;

    try {
        const decoded = jwtDecode(accessToken);
        const tokenExpiresIn = decoded?.exp - Math.floor(Date.now() / 1000);
        return Number.isFinite(tokenExpiresIn) ? tokenExpiresIn : null;
    } catch (error) {
        removeTokens();
        return null;
    }
}

export function startTokenRefreshTimer(expiresIn, dispatch) {
    if (refreshTimer) {
        clearTimeout(refreshTimer);
    }

    const resolvedExpiresIn = resolveExpiresInSeconds(expiresIn);
    if (!resolvedExpiresIn || resolvedExpiresIn <= 0) {
        dispatch(refreshAuthToken());
        return;
    }

    const timeout = Math.max((resolvedExpiresIn - 10) * 1000, 1000);

    refreshTimer = setTimeout(() => {
        dispatch(refreshAuthToken());
    }, timeout);
}

export function stopTokenRefreshTimer() {
    if (refreshTimer) {
        clearTimeout(refreshTimer);
        refreshTimer = null;
    }
}
