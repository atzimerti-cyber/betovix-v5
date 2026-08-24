import axios from 'axios';

import { getAccessToken } from './utils/auth';
import config from './config';
import { getDeviceTelemetryHeaders } from './utils/deviceFingerprint';


const shouldAttachDeviceTelemetry = (url) => {
    if (typeof url !== 'string') return false;

    const normalizedUrl = url.toLowerCase();
    return normalizedUrl.includes('login/authenticate2')
        || normalizedUrl.includes('login/authenticategoogle')
        || normalizedUrl.includes('auth/login');
};

const fetchClient = () => {
    const defaultOptions = {
        baseURL: config.VITE_WALLET_API_BASE,
        crossDomain: true,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    // Create instance
    let instance = axios.create(defaultOptions);

    // Set the AUTH token for any request
    instance.interceptors.request.use(async function (config) {
        const token = getAccessToken();
        if (token && !config.noToken) {
            config.headers.Authorization = 'Bearer ' + token;
        }

        if (shouldAttachDeviceTelemetry(config.url)) {
            const telemetryHeaders = await getDeviceTelemetryHeaders();

            if (typeof config.headers?.set === 'function') {
                Object.entries(telemetryHeaders).forEach(([name, value]) => config.headers.set(name, value));
            } else {
                config.headers = {
                    ...config.headers,
                    ...telemetryHeaders,
                };
            }
        }

        // Remove 'application/json' Content-Type if sending FormData
        if (config.data instanceof FormData) {
            delete config.headers['Content-Type']; // Let the browser set this automatically
        }

        if (config.baseURLOverride) {
            config.baseURL = config.baseURLOverride;
            delete config.baseURLOverride;
        }

        const cfg = {
            ...config,
            signal: config.signal,
        };

        return cfg;
    });

    // instance.interceptors.response.use(
    //     (response) => {
    //         // if (response.status === 401) {
    //         //     alert('You are not authorized');
    //         // }
    //         return response;
    //     },
    //     async (error) => {
    //         const originalRequest = error.config;
    //         console.log(originalRequest._retry);
    //         if (error.response.status === 403 && !originalRequest._retry) {
    //             originalRequest._retry = true;

    //             try {
    //                 const refreshToken = getRefreshToken();
    //                 const response = await instance.post('api/auth/updateAccessToken', { refreshToken: refreshToken });
    //                 if (response?.statusText === 'OK') {
    //                     setAccessToken(response.data);
    //                 } else {
    //                     throw Error();
    //                 }
    //             } catch (error) {
    //                 console.log(error);
    //                 return;
    //             }

    //             return instance(originalRequest);
    //         }

    //         // if (error.response && error.response.data) {
    //         //     return Promise.reject(error.response.data);
    //         // }
    //         return Promise.reject(error.message);
    //     }
    // );

    // Response interceptor for API calls
    // instance.interceptors.response.use(
    //     (response) => {
    //         return response;
    //     },
    //     async function (error) {
    //         const originalRequest = error.config;
    //         if (error.response.status === 403 && !originalRequest._retry) {
    //             originalRequest._retry = true;
    //             const access_token = await updateAccessToken();
    //             axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
    //             return axiosApiInstance(originalRequest);
    //         }
    //         return Promise.reject(error);
    //     }
    // );

    return instance;
};

export default fetchClient();
