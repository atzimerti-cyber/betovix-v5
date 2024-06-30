import { jwtDecode } from 'jwt-decode';

export function getAccessToken() {
    const accessToken = localStorage.getItem('accessToken');

    let decoded;
    if (accessToken) {
        const now = Date.now() / 1000;
        decoded = jwtDecode(accessToken);
        const exp = decoded.exp;

        if (exp < now) {
            removeTokens();
            return null;
        }
    }

    return accessToken;
}

export function getRefreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    return refreshToken;
}

export function setTokens(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    // localStorage.setItem('refreshToken', refreshToken);
}

export function setAccessToken(accessToken) {
    localStorage.setItem('accessToken', accessToken);
}

export function removeTokens() {
    localStorage.removeItem('accessToken');
    // localStorage.removeItem('refreshToken');
}
