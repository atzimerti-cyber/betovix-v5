// window.SETTINGS = {
//     VITE_CASINO_BASE: 'https://casinoapi.storetube.gr:61020/api',
//     VITE_WALLET_API_BASE: 'https://storetube.gr:61009/api',
//     VITE_SPORTS_API_BASE: 'https://storetube.gr:60009/api',
//     VITE_SPORTS_LOGOS: 'https://cdnsports.modulesports.com/assets',
//     VITE_CASINO_LOBBY: 'https://casinom.storetube.gr',
//     VITE_CASINO_LIVE_LOBBY: 'https://casinom.storetube.gr',
//     VITE_BETS_API: 'https://storetube.gr:60019/api',
//     VITE_SITE_ID: 0,
//     VITE_HOME_URL: 'https://betovix.storetube.gr',
//     VITE_VEGAS_HOME_URL: 'https://betovix.storetube.gr',

//     VITE_WALLET_STORETUBE: 'https://storetube.gr:61009/api',
//     VITE_STORETUBE: 'https://storetube.gr:60019/api',
//     VITE_CASINO_STORETUBE_BASE: 'https://casinoapi.storetube.gr:61020/api',

//     VITE_GAMIFICATION_STORETUBE: 'https://gamificationapi.storetube.gr:61113/api',
//     VITE_UPLOAD: 'https://wallet1.modulesports.com:61009/api',
//     TRACKER_PARTNERID: '18764645',
//     VOUCHER_TOKEN: "W7i6WT6CvkssscJVObTxIaA4XBsfNGXDj1rFKbKDvusqsw281jNM8a8cTkUis9Sm",
//     CASINO_OPEN_STYLE: 'WITHBONUS' //WITHBONUS - FULLSCREEN
// }

// window.SETTINGS = {
//     VITE_CASINO_BASE: 'https://casinoapi.modulesports.com:61020/api',
//     VITE_WALLET_API_BASE: 'https://modulesports.com:61009/api',
//     VITE_SPORTS_API_BASE: 'https://modulesports.com:60009/api',
//     VITE_SPORTS_LOGOS: 'https://cdnsports.modulesports.com/assets',
//     VITE_CASINO_LOBBY: 'https://casinom.storetube.gr',
//     VITE_CASINO_LIVE_LOBBY: 'https://casinom.storetube.gr',
//     VITE_BETS_API: 'https://modulesports.com:60019/api',
//     VITE_SITE_ID: 0,
//     VITE_HOME_URL: 'https://betovix.storetube.gr',
//     VITE_VEGAS_HOME_URL: 'https://betovix.com',

//     VITE_WALLET_STORETUBE: 'https://modulesports.com:61009/api',
//     VITE_STORETUBE: 'https://modulesports.com:60019/api',
//     VITE_CASINO_STORETUBE_BASE: 'https://casinoapi.storetube.gr:61020/api',

//     VITE_GAMIFICATION_STORETUBE: 'https://gamificationapi.storetube.gr:61113/api',
//     VITE_UPLOAD: 'https://wallet1.modulesports.com:61009/api',
//     CASINO_OPEN_STYLE: 'FULLSCREEN' //WITHBONUS - FULLSCREEN
// } 

window.SETTINGS_prod = {
    VITE_SITE_ID: 1,

    VITE_CASINO_BASE: 'https://modulesports.com:55000/api',
    VITE_ANALYTICS_BASE: 'https://modulesports.com:55000/api',
    VITE_WALLET_API_BASE: 'https://modulesports.com:55000/api',
    VITE_SPORTS_API_BASE: 'https://modulesports.com:55000/api',
    VITE_BETS_API: 'https://modulesports.com:55000/api',
    VITE_LEGACY_SPORTS_API_BASE: 'https://modulesports.com:60009/api',
    VITE_SPORTS_LOGOS: 'https://cdnlatam.modulesports.net/teams',
    VITE_CDN: 'https://cdnwallet.modulesports.com',
    VITE_LOGIN_API: 'https://v5.modulesports.com:55000/api',

    VITE_UPLOAD: 'https://modulesports.com:55000/api',
    TRACKER_PARTNERID: '18764645',

    ENABLE_SUSPEND: true,
    MARKETS_TO_GROUP: [2597062, 3063143, 3063134, 2597051],
};

window.SETTINGS_dev = {
    VITE_SITE_ID: 0,

    VITE_CASINO_BASE: 'https://storetube.gr:55000/api',
    VITE_ANALYTICS_BASE: 'https://storetube.gr:55000/api',
    VITE_WALLET_API_BASE: 'https://storetube.gr:55000/api',
    VITE_SPORTS_API_BASE: 'https://storetube.gr:55000/api',
    VITE_BETS_API: 'https://storetube.gr:55000/api',
    VITE_LEGACY_SPORTS_API_BASE: 'https://modulesports.com:60009/api',
    VITE_SPORTS_LOGOS: 'https://cdnlatam.modulesports.net/teams',
    VITE_CDN: 'https://cdnwallet.modulesports.com',
    VITE_LOGIN_API: 'https://v5.storetube.gr:55000/api',

    VITE_UPLOAD: 'https://wallet1.storetube.gr:55000/api',
    TRACKER_PARTNERID: '18764645',

    ENABLE_SUSPEND: true,
    MARKETS_TO_GROUP: [2597062, 3063143, 3063134, 2597051],
};

(function () {
    var hostname = window.location.hostname || '';
    var isDevDomain = hostname.indexOf('storetube.gr') !== -1 || hostname.indexOf('localhost') !== -1;

    window.SETTINGS = isDevDomain ? Object.assign({}, window.SETTINGS_prod, window.SETTINGS_dev) : window.SETTINGS_prod;
})();
