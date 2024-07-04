export function formatNumberMax(value, dp) {
    if (isNaN(value)) return value;
    return +parseFloat(value).toFixed(dp);
}

export function formatNumberTo(value, dp = 2) {
    if (isNaN(value)) return value;
    return parseFloat(value).toFixed(dp);
}

export function formatDateTimeObj(d) {
    if (typeof d === 'string') {
        d = new Date(d);
    }

    const formattedDate = d.toLocaleDateString('en-US', {
        weekday: 'short', // abbreviated day of the week, e.g., "Sat"
        month: 'short', // abbreviated month, e.g., "Apr"
        day: '2-digit', // day of the month as two digits, e.g., "20"
    });

    const formattedTime = d.toLocaleTimeString('en-US', {
        hour: '2-digit', // 2-digit hour
        minute: '2-digit', // 2-digit minute
        hour12: true, // Use 12-hour format
    });

    return { date: formattedDate, time: formattedTime };
}

export function formatDateTime(d) {
    if (typeof d === 'string') {
        d = new Date(d);
    }

    const formattedDate = d.toLocaleDateString('en-US', {
        month: 'short', // abbreviated month, e.g., "Apr"
        day: '2-digit', // day of the month as two digits, e.g., "20"
    });

    const formattedTime = d.toLocaleTimeString('en-US', {
        hour: '2-digit', // 2-digit hour
        minute: '2-digit', // 2-digit minute
        hour12: true, // Use 12-hour format
    });

    return `${formattedDate}, ${formattedTime}`;
}

export function formatDateTime2(d) {
    if (typeof d === 'string') {
        d = new Date(d);
    }

    const formattedDate = d.toLocaleDateString('en-GB');

    const formattedTime = d.toLocaleTimeString('en-GB', {
        hour: '2-digit', // 2-digit hour
        minute: '2-digit', // 2-digit minute
        hour12: true, // Use 12-hour format
    });

    return `${formattedDate}, ${formattedTime}`;
}

export function formatTimeString(time) {
    if (!time) return 0;

    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = time.split(':');

    // Check if hours are '00', and return 'MM:SS' if true, otherwise return 'HH:MM:SS'
    if (hours === '00') {
        return `${minutes}:${seconds}`;
    } else {
        return `${hours}:${minutes}:${seconds}`;
    }
}

export function millisecondsToDateStr(m) {
    if (typeof m !== 'number') return m;

    const d = new Date(m);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
}

export function getTimeUntil(future) {
    if (typeof future === 'string') {
        future = new Date(future);
    }
    const now = new Date();

    // Check if the future date is the same day as today
    if (future.toDateString() === now.toDateString()) {
        const msDifference = future - now; // Milliseconds difference
        const hours = msDifference / (1000 * 60 * 60);

        // If less than an hour but more than 0 minutes
        if (hours < 1 && msDifference > 0) {
            const minutes = Math.ceil(msDifference / (1000 * 60));
            return minutes === 1 ? 'in 1 minute' : `in ${minutes} minutes`;
        } else if (hours >= 1) {
            const intHours = parseInt(hours);
            return intHours === 1 ? 'in 1 hour' : `in ${intHours} hours`;
        } else {
            // Handle the case when the future time has already passed or is exactly now
            return 'Time has passed or match is starting now';
        }
    } else {
        // Calculate the difference in days
        const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startOfFutureDay = new Date(future.getFullYear(), future.getMonth(), future.getDate());
        const days = Math.ceil((startOfFutureDay - startOfDay) / (1000 * 60 * 60 * 24));
        return days === 1 ? 'in a day' : `in ${days} days`;
    }
}

export function getOrdinal(n) {
    const s = ['th', 'st', 'nd', 'rd'];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function addThousandsSeparator(value, decimals = 2) {
    if (value === null) return null;

    value = Number(value).toFixed(decimals);
    if (value >= 1000) value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return value;
}

export function getSportMarketTreeObj(sportMarketTree) {
    if (!sportMarketTree) return null;

    let smto = {};

    for (let i = 0; i < sportMarketTree.childs.length; i++) {
        const group = sportMarketTree.childs[i];

        if (!group) continue;

        for (let k = 0; k < group.childs.length; k++) {
            const sub = group.childs[k];

            if (!sub) continue;

            for (let m = 0; m < sub.childs.length; m++) {
                const market = sub.childs[m];

                if (!market) continue;
                if (!market.childs || market.childs.length === 0) continue;

                const marketTypeId = market.data.Id;

                // if added before, retain the previous groups
                let groups = [];
                if (smto[marketTypeId]) {
                    groups = smto[marketTypeId].groups;
                }

                groups.push({
                    badge: group.badge,
                    isActive: group.isActive,
                    name: group.name,
                    type: 'group',
                    groupIndex: i,
                });

                smto[marketTypeId] = {
                    name: market.name,
                    isActive: market.isActive,
                    type: 'market',
                    badge: market.badge,
                    data: { ...market.data },
                    fields: {},
                    marketIndex: m,
                    sub: {
                        badge: sub.badge,
                        name: sub.name,
                        type: 'sub',
                        subIndex: k,
                    },
                    groups: groups,
                };

                for (let field of market.childs) {
                    if (!field) continue;
                    const fieldTypeId = field.data.FieldTypeId;

                    smto[marketTypeId].fields[fieldTypeId] = {
                        badge: field.badge,
                        name: field.name,
                        type: 'field',
                        data: { ...field.data },
                    };
                }
            }
        }
    }

    return smto;
}

export function getSportMarketTreeObjFromMarkets(markets) {
    if (!markets || markets.length === 0) return null;
    markets.sort((a, b) => a.MarketTypeId - b.MarketTypeId);
    let smto = {};

    for (let m = 0; m < markets.length; m++) {
        const market = markets[m];
        const marketTypeId = market.MarketTypeId;

        smto[marketTypeId] = {
            name: market.MarketName.International,
            isActive: market.Active,
            type: 'market',
            badge: null,
            data: null,
            fields: {},
            marketIndex: m,
            sub: {
                badge: null,
                name: market.MarketName.International,
                type: 'sub',
                subIndex: market.MarketSubTypeId ? parseInt(market.MarketSubTypeId) : market.MarketTypeId,
            },
            groups: [{ badge: null, isActive: market.Active, name: 'All', type: 'group', groupIndex: 0 }],
        };

        for (let field of market.MarketFields) {
            if (!field) continue;
            const fieldTypeId = field.FieldTypeId;

            smto[marketTypeId].fields[fieldTypeId] = {
                badge: null,
                name: field.FieldName.International,
                type: 'field',
                data: null,
            };
        }
    }

    return smto;
}

export function getTranslation(property, translationsObj) {
    let translated = translationsObj[property];
    if (!translated) translated = property;
    return translated;
}

export function childsNotExist(obj) {
    // Base case: check if childs exists and its length is 0
    if (!obj.childs || obj.childs.length === 0) {
        return true;
    }

    // Recursive case: iterate through the childs array
    if (childsNotExist(obj.childs[0])) {
        return true;
    }

    // we have market with children
    if (obj.type === 'market') return false;

    // We haven't reached the market children
    return false;
}
