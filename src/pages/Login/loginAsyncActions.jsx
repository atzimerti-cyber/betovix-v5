import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import config from '../../config';
import { getLang } from '../../utils/storage';
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  startTokenRefreshTimer,
} from '../../utils/auth';
import { translate } from '../../utils/translations';
import { getCurrentBonusBalance } from '../../utils/bonusUtils';
import { loginActions } from './loginSlice';
import { layoutActions } from '../../features/Layout/layoutSlice';
import { appActions } from '../../features/InitApp/appSlice';

const AUTH_BASE = config.VITE_LOGIN_API || config.VITE_WALLET_API_BASE;
const API_BASE = config.VITE_WALLET_API_BASE;


const normalizeInternalRoute = (value) => {
  if (typeof value !== 'string') return '';
  const trimmed = value.trim();
  if (!trimmed) return '';
  const route = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
  return route.startsWith('//') ? '' : route;
};

const isTrueSetting = (value) =>
  value === true || value === 1 || ['true', '1'].includes(String(value ?? '').trim().toLowerCase());

const resolvePostLoginRoute = (state, fallback = '/') => {
  const settings = state?.app?.siteSettings || {};
  const tabletWidth = Number.parseFloat(state?.layout?.tabletWidth) || 1140;
  if (isTrueSetting(settings.Landbase) && typeof window !== 'undefined' && window.innerWidth > tabletWidth) {
    return '/land';
  }
  return normalizeInternalRoute(settings.RedirectAfterLogin) || fallback || '/';
};
const safeMessage = (error, fallback) =>
  error?.response?.data?.detail ||
  error?.response?.data?.message ||
  error?.response?.data?.title ||
  error?.message ||
  fallback;

const readClaim = (claims, ...keys) => {
  for (const key of keys) {
    const value = claims?.[key];
    if (value !== undefined && value !== null && value !== '') return value;
  }
  return null;
};

const toNumber = (value) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};

const normalizeArrayClaim = (value) => {
  if (Array.isArray(value)) return value;
  if (value === undefined || value === null || value === '') return [];
  return [value];
};

const getAuthIdentityFromToken = () => {
  const token = getAccessToken();
  if (!token) return null;

  try {
    const claims = jwtDecode(token);
    const userId = toNumber(
      readClaim(
        claims,
        'userId',
        'UserId',
        'sub',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier',
      ),
    );
    const accountId = toNumber(readClaim(claims, 'accountId', 'AccountId', 'account_id')) || userId;
    const siteId =
      toNumber(readClaim(claims, 'siteId', 'SiteId', 'site_id')) || Number(config.VITE_SITE_ID);

    return {
      userId,
      accountId,
      siteId,
      email: readClaim(claims, 'email', 'Email', 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'),
      username: readClaim(claims, 'username', 'Username', 'name', 'unique_name'),
      roles: normalizeArrayClaim(
        readClaim(
          claims,
          'roles',
          'role',
          'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
        ),
      ),
      permissions: normalizeArrayClaim(readClaim(claims, 'permissions', 'permission')),
      isPlatformAdmin: String(readClaim(claims, 'isPlatformAdmin', 'platform_admin') || '').toLowerCase() === 'true',
    };
  } catch {
    return null;
  }
};

const resolveCurrencyCode = (state) =>
  String(
    state?.app?.siteCurrency ||
      state?.app?.siteSettings?.Currency ||
      state?.app?.siteSettings?.currency ||
      'EUR',
  ).toUpperCase();

const loadMainWallet = async ({ siteId, accountId, currencyCode }) => {
  if (!siteId || !accountId || !currencyCode) return null;

  try {
    const response = await axiosApi.get(
      `wallets/by-account/${encodeURIComponent(siteId)}/${encodeURIComponent(accountId)}/1/${encodeURIComponent(currencyCode)}`,
      { baseURLOverride: API_BASE },
    );

    const value = response?.data || {};
    return {
      ...value,
      AccountId: value.accountId ?? value.AccountId ?? accountId,
      Balance: value.balance ?? value.Balance ?? 0,
      ReservedBalance:
        value.reservedBalance ??
        value.ReservedBalance ??
        value.withdrawalLockedBalance ??
        value.WithdrawalLockedBalance ??
        0,
      Currency: value.currencyCode ?? value.CurrencyCode ?? currencyCode,
    };
  } catch {
    return {
      AccountId: accountId,
      Balance: 0,
      ReservedBalance: 0,
      Currency: currencyCode,
    };
  }
};

const syncAuthenticatedBonusState = async (dispatch, langId) => {
  const [activeResult, summaryResult] = await Promise.allSettled([
    axiosApi.get(`bonus/me/active?lang=${langId}&SiteId=${config.VITE_SITE_ID}`, {
      baseURLOverride: API_BASE,
    }),
    axiosApi.get(`bonus/me/summary?lang=${langId}&SiteId=${config.VITE_SITE_ID}`, {
      baseURLOverride: API_BASE,
    }),
  ]);

  if (activeResult.status === 'fulfilled' && activeResult.value?.status === 200) {
    const activeBonuses = activeResult.value.data;
    dispatch(appActions.setActiveBonuses(activeBonuses));
    dispatch(layoutActions.setAvailableBonusBalance(getCurrentBonusBalance(activeBonuses)));
  } else {
    dispatch(appActions.setActiveBonuses(null));
    dispatch(layoutActions.setAvailableBonusBalance(0));
  }

  if (summaryResult.status === 'fulfilled' && summaryResult.value?.status === 200) {
    dispatch(appActions.setSummaryBonuses(summaryResult.value.data));
  } else {
    dispatch(appActions.setSummaryBonuses(null));
  }
};

const hydrateUserFromAuth = async (dispatch, getState, auth = null, usernameOrEmail = null) => {
  const identity = auth
    ? {
        userId: Number(auth.userId || 0),
        accountId: Number(auth.accountId || auth.userId || 0),
        siteId: Number(auth.siteId || config.VITE_SITE_ID),
        email: auth.email || null,
        username: usernameOrEmail || auth.email || null,
        roles: auth.roles || [],
        permissions: auth.permissions || [],
        isPlatformAdmin: Boolean(auth.isPlatformAdmin),
        canSwitchSite: Boolean(auth.canSwitchSite),
        availableSites: auth.availableSites || [],
      }
    : getAuthIdentityFromToken();

  if (!identity?.userId) return null;

  const currencyCode = resolveCurrencyCode(getState());
  const wallet = await loadMainWallet({
    siteId: identity.siteId || Number(config.VITE_SITE_ID),
    accountId: identity.accountId || identity.userId,
    currencyCode,
  });

  const user = {
    UserId: identity.userId,
    AccountId: identity.accountId || identity.userId,
    Email: identity.email,
    Username: identity.username || identity.email,
    SiteId: identity.siteId || Number(config.VITE_SITE_ID),
    Role: 40,
    Roles: identity.roles || [],
    Permissions: identity.permissions || [],
    IsPlatformAdmin: Boolean(identity.isPlatformAdmin),
    CanSwitchSite: Boolean(identity.canSwitchSite),
    AvailableSites: identity.availableSites || [],
    Wallet: wallet,
  };

  dispatch(loginActions.setUser(user));
  dispatch(layoutActions.setAvailableBonus(user));
  await syncAuthenticatedBonusState(dispatch, getLang()?.id || 'en');
  return user;
};


export const logingGoogle = () => {
  return async () => {
    toast.error(translate('Google sign in is not available on the new authentication API yet.'));
    return { success: false };
  };
};

export const login = (loginInfo, navigate, locationPathname, onSuccess) => {
  return async (dispatch, getState) => {
    dispatch(loginActions.setLoginLoading(true));

    try {
      const usernameOrEmail = String(loginInfo?.Username || loginInfo?.usernameOrEmail || '').trim();
      const password = String(loginInfo?.Password || loginInfo?.password || '');

      const response = await axiosApi.post(
        'auth/login',
        {
          usernameOrEmail,
          password,
          siteId: Number(config.VITE_SITE_ID),
        },
        { baseURLOverride: AUTH_BASE, noToken: true },
      );

      const auth = response?.data || {};
      if (!auth.accessToken) throw new Error('Invalid login response.');

      if (auth.requiresTwoFactor) {
        // The new AuthController currently exposes the flag but no public 2FA-completion endpoint.
        // Do not silently fall back to the legacy Authenticate3 flow.
        throw new Error('Two-factor authentication is required, but the new authentication API does not expose a verification endpoint yet.');
      }

      setTokens(auth.accessToken, auth.refreshToken);
      startTokenRefreshTimer(auth.expiresInSeconds, dispatch);
      await hydrateUserFromAuth(dispatch, getState, auth, usernameOrEmail);

      navigate(resolvePostLoginRoute(getState(), locationPathname), { replace: true });
      onSuccess?.();
      return { success: true, data: auth };
    } catch (error) {
      if (error?.response?.data?.errorCode === 'identity.email_not_verified') {
        const email = String(loginInfo?.Username || loginInfo?.usernameOrEmail || '').trim();
        dispatch(loginActions.setMailToVerify(email));
        sessionStorage.setItem('mailToVerify', email);
        navigate(`${locationPathname || '/'}?modal=verify`, { replace: false });
      }
      toast.error(translate(safeMessage(error, 'Invalid Login')));
      return { success: false, error };
    } finally {
      dispatch(loginActions.setLoginLoading(false));
    }
  };
};

export const refreshAuthToken = () => {
  return async (dispatch) => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        dispatch(loginActions.logout());
        return false;
      }

      const response = await axiosApi.post(
        'auth/refresh',
        { refreshToken },
        { baseURLOverride: AUTH_BASE, noToken: true },
      );

      if (!response?.data?.accessToken) throw new Error('Refresh failed');

      setTokens(response.data.accessToken, response.data.refreshToken);
      startTokenRefreshTimer(response.data.expiresInSeconds, dispatch);
      return true;
    } catch (error) {
      if (error?.response?.status === 401 || error?.response?.status === 403) {
        dispatch(loginActions.logout());
      }
      return false;
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      await axiosApi.post('auth/logout', {}, { baseURLOverride: AUTH_BASE });
    } catch {
      // Local logout must still complete if the session is already invalid/expired.
    } finally {
      dispatch(loginActions.logout());
    }
  };
};

export const getUser = () => {
  return async (dispatch, getState) => {
    try {
      if (!getAccessToken()) return null;
      return await hydrateUserFromAuth(dispatch, getState);
    } catch {
      dispatch(loginActions.logout());
      return null;
    }
  };
};

export const registerPlayer = (payload, navigate, location) => {
  return async (dispatch) => {
    dispatch(loginActions.setLoginLoading(true));

    try {
      const response = await axiosApi.post('player-registration', payload, {
        baseURLOverride: AUTH_BASE,
        noToken: true,
      });

      if (response.status !== 201) throw new Error('Registration failed.');

      toast.success(`${translate('Success')}! ${translate('Please check your email to verify your registration')}.`);
      dispatch(loginActions.setMailToVerify(payload.email));
      sessionStorage.setItem('mailToVerify', payload.email);

      const searchParams = new URLSearchParams(location.search);
      searchParams.set('modal', 'verify');
      searchParams.delete('tab');
      navigate(`${location.pathname}?${searchParams.toString()}`, { replace: false });

      return { success: true, data: response.data };
    } catch (error) {
      toast.error(translate(safeMessage(error, 'Registration failed')));
      return { success: false, error };
    } finally {
      dispatch(loginActions.setLoginLoading(false));
    }
  };
};

// Compatibility alias for any remaining imports while all registration UI now uses registerPlayer.
export const register = (registerInfo, navigate, locationPathname) => {
  return async (dispatch, getState) => {
    const state = getState();
    const siteSettings = state.app.siteSettings || {};
    const parentAccountId = Number(
      siteSettings.defaultShopId ??
        siteSettings.DefaultShopId ??
        siteSettings.RegistrationParentAccountId ??
        siteSettings.PlayerParentAccountId ??
        siteSettings.ParentAccountId ??
        0,
    );
    const affiliateTrackingCode = registerInfo?.code || localStorage.getItem('AffiliateCode') || null;

    return dispatch(
      registerPlayer(
        {
          siteId: Number(config.VITE_SITE_ID),
          parentAccountId,
          email: String(registerInfo?.email || '').trim(),
          username: String(registerInfo?.displayName || registerInfo?.username || '').trim(),
          password: registerInfo?.password,
          firstName: String(registerInfo?.firstName || '').trim(),
          lastName: String(registerInfo?.lastName || '').trim(),
          birthDate: registerInfo?.birthDate || null,
          phoneNumber: registerInfo?.phoneNumber || null,
          mobile: registerInfo?.phoneNumber || null,
          nationality: registerInfo?.country || null,
          affiliateTrackingCode,
          enforcePasswordPolicy: true,
          queueOnboardingAutomation: true,
          preferences: {
            language: getLang()?.id || 'en',
            currency: resolveCurrencyCode(state),
          },
        },
        navigate,
        { pathname: locationPathname, search: window.location.search },
      ),
    );
  };
};

export const getRegistrationPreferences = (signal) => {
  return async () => {
    try {
      const response = await axiosApi.get(
        `player-registration/preferences?siteId=${encodeURIComponent(config.VITE_SITE_ID)}`,
        { signal, baseURLOverride: AUTH_BASE, noToken: true },
      );
      return response.data;
    } catch (error) {
      if (error?.code !== 'ERR_CANCELED') {
        console.warn('Registration preferences unavailable', safeMessage(error, 'Unknown error'));
      }
      return null;
    }
  };
};

export const getRegistrationBonuses = (signal, callback) => {
  return async (dispatch) => {
    dispatch(loginActions.setBonusesLoading?.(true));
    try {
      const response = await axiosApi.get(
        `player-registration/bonus-choice-set?siteId=${encodeURIComponent(config.VITE_SITE_ID)}`,
        { signal, baseURLOverride: AUTH_BASE, noToken: true },
      );
      callback?.(response.data);
      return response.data;
    } catch (error) {
      if (error?.code !== 'ERR_CANCELED') {
        console.warn('Registration bonus choices unavailable', safeMessage(error, 'Unknown error'));
      }
      callback?.(null);
      return null;
    } finally {
      dispatch(loginActions.setBonusesLoading?.(false));
    }
  };
};

export const requestPasswordReset = (usernameOrEmail) => {
  return async (dispatch) => {
    dispatch(loginActions.setUpdateLoading(true));
    try {
      const response = await axiosApi.post(
        'auth/forgot-password',
        {
          usernameOrEmail: String(usernameOrEmail || '').trim(),
          siteId: Number(config.VITE_SITE_ID),
        },
        { baseURLOverride: AUTH_BASE, noToken: true },
      );

      if (response?.data?.accepted === false) {
        throw new Error(response?.data?.message || 'Password reset request was not accepted.');
      }

      toast.success(translate(response?.data?.message || 'Please check your email for password reset instructions.'));
      return { success: true, data: response.data };
    } catch (error) {
      toast.error(translate(safeMessage(error, 'Password reset request failed')));
      return { success: false, error };
    } finally {
      dispatch(loginActions.setUpdateLoading(false));
    }
  };
};

export const resetPassword = (token, newPassword) => {
  return async (dispatch) => {
    dispatch(loginActions.setUpdateLoading(true));
    try {
      const response = await axiosApi.post(
        'auth/reset-password',
        {
          token: String(token || '').trim(),
          newPassword: String(newPassword || ''),
        },
        { baseURLOverride: AUTH_BASE, noToken: true },
      );

      toast.success(translate(response?.data?.message || 'Password updated successfully'));
      return { success: true, data: response.data };
    } catch (error) {
      toast.error(translate(safeMessage(error, 'Password reset failed')));
      return { success: false, error };
    } finally {
      dispatch(loginActions.setUpdateLoading(false));
    }
  };
};

export const resendEmail = (data, callback) => {
  return async (dispatch) => {
    dispatch(loginActions.setUpdateLoading(true));
    try {
      await axiosApi.post(
        'player-registration/resend-verification-email',
        { usernameOrEmail: data, siteId: Number(config.VITE_SITE_ID) },
        { baseURLOverride: AUTH_BASE, noToken: true },
      );
      toast.success(`${translate('Success')}! ${translate('Please check your email to verify your registration')}.`);
      callback?.(true);
      return true;
    } catch (error) {
      toast.error(translate(safeMessage(error, 'An error has occurred')));
      callback?.(false);
      return false;
    } finally {
      dispatch(loginActions.setUpdateLoading(false));
    }
  };
};

export const verify = (code, navigate) => {
  return async () => {
    try {
      const response = await axiosApi.get(
        `player-registration/verify-email?token=${encodeURIComponent(code)}`,
        { baseURLOverride: AUTH_BASE, noToken: true },
      );

      if (response?.data?.verified) {
        toast.success(translate('Account verified successfully'));
        navigate('?modal=auth&tab=login', { replace: true });
      } else {
        toast.error(translate('Account could not be verified. Please try again.'));
      }
    } catch (error) {
      toast.error(translate(safeMessage(error, 'An error has occurred')));
    }
  };
};

// The new backend does not expose the old Authenticate3 / OTP auth endpoints.
// Keep the exported function only so old modal imports cannot accidentally call the legacy backend.
export const verifyTfa = () => {
  return async () => {
    toast.error(
      translate('Two-factor authentication is required, but the new authentication API does not expose a verification endpoint yet.'),
    );
    return false;
  };
};

export const affiliateCampaigns = (code) => {
  return async () => {
    if (!code) return false;
    // Affiliate click attribution is now submitted with player-registration.
    // Do not call the old AffiliateCampaigns endpoint from the consumer site.
    return true;
  };
};
