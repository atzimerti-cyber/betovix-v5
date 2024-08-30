import axiosApi from '../../axios-api';
import AchievementModal from '../../features/ModalRoot/Modals/AchievementModal';

import { loginActions } from './loginSlice';
import { layoutActions } from '../../../src/features/Layout/layoutSlice';
import { gamificationActions } from '../UserGamification.jsx/userGamificationSlice';

import { toast } from 'react-toastify';
import { setAccessToken } from '../../utils/auth';

export const login = (loginInfo, navigate, locationPathname) => {
    return async (dispatch) => {
        dispatch(loginActions.setLoginLoading(true));

        try {
            const response = await axiosApi.post('login/Authenticate2', loginInfo, { baseURLOverride: import.meta.env.VITE_WALLET_API_BASE });
            if (response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);
            setAccessToken(response.data.Contents.Token);

            const response2 = await axiosApi.get(`login/State/?lang=en&siteid=${import.meta.env.VITE_SITE_ID}`, {
                baseURLOverride: import.meta.env.VITE_WALLET_API_BASE,
            });
            if (response2.data.Status.StatusCode !== 200) throw Error(response2.data.Contents);

            // TODO: The rest should come from the backend
            const user = {
                ...response2.data.Contents,

                // profileHidden: false,
                // marketingEmails: true,
                // level: 0,
                // wagered: 500,
                // registered: 1712505696754,
            };

            dispatch(loginActions.setUser(user));

            dispatch(loginActions.setLoginLoading(false));
            navigate(locationPathname, { replace: true });
        } catch (error) {
            toast.error(error?.message);
            dispatch(loginActions.setLoginLoading(false));
        }
    };
};

export const register = (registerInfo, navigate, locationPathname) => {
    return async (dispatch) => {
        dispatch(loginActions.setLoginLoading(true));

        try {
            let response2;
            const response1 = await axiosApi.get(`/MyAccount/UsernameExists?username=${registerInfo.displayName}&lang=en&siteid=${import.meta.env.VITE_SITE_ID}`, {
                baseURLOverride: import.meta.env.VITE_WALLET_API_BASE,
            });
            setTimeout(() => {
                dispatch(loginActions.setLoginLoading(false));
                // navigate(`${locationPathname}?modal=auth&tab=login`, { replace: true });

                // toast.success('Wow so easy!');
            }, 1000);
            if (response1.data.Contents == true) {
                toast.error('Username already exists.');
            } else if (response1.data.Contents == false) {
                response2 = await axiosApi.post(`MyAccount/Register/?lang=en&siteid=${import.meta.env.VITE_SITE_ID}`,
                    {
                        Code: registerInfo.code,
                        Email: registerInfo.email,
                        Password: registerInfo.password,
                        SiteId: import.meta.env.VITE_SITE_ID,
                        Username: registerInfo.displayName,
                    },
                    {
                        baseURLOverride: import.meta.env.VITE_WALLET_API_BASE,
                    });
                if (response2.data.Status.StatusCode !== 200) {
                    toast.error(response2.data.Contents);
                } else {
                    // toast.success(response2.data.Contents);
                    toast.success('Success! Please check your email to verify your registration.');
                    navigate(`${locationPathname}?modal=auth&tab=login`, { replace: true });
                }

                console.log(response2);
            }

        } catch (error) {
            dispatch(loginActions.setLoginLoading(false));
            toast.error('An error has occurred!');
        }
    };
};
export const verify = (code, navigate) => {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get(`/MyAccount/VerifyAccount?activationCode=${code}`, {
                baseURLOverride: import.meta.env.VITE_WALLET_API_BASE,
            });
            if (response.data.Status.StatusCode === 200) {
                toast.success(response.data.Contents);
                navigate(`?modal=auth&tab=login`, { replace: true });
            } else {
                toast.error(response.data.Contents);
                navigate(``, { replace: true });
                dispatch(loginActions.setLoginLoading(false));
            }

        } catch (error) {
            toast.error('An error has occurred!');
        }
    };
}

export const getUser = (navigate) => {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get(`login/State/?lang=en&siteid=${import.meta.env.VITE_SITE_ID}`, {
                baseURLOverride: import.meta.env.VITE_WALLET_API_BASE,
                // baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
            });
            if (response.data.Status.StatusCode !== 200) dispatch(loginActions.logout());
            else {
                // TODO: The rest should come from the backend
                const user = {
                    ...response.data.Contents,

                    // profileHidden: false,
                    // marketingEmails: true,
                    // level: 0,
                    // wagered: 500,
                    // registered: 1712505696754,
                };

                let rewards = [];

                const params = new URLSearchParams(window.location.search);
                const isModalAchievementOpen = params.get('modal') === 'achievement';

                if (!isModalAchievementOpen && response.data.Contents.Rewards && response.data.Contents.Rewards.length > 0) {
                    rewards = response.data.Contents.Rewards;
                    dispatch(gamificationActions.setPopupRewards(rewards));

                    const params = new URLSearchParams(location.search);
                    params.set('modal', 'achievement');

                    navigate(`${location.pathname}?modal=achievement`, { replace: false });

                }
                dispatch(loginActions.setUser(user));
                dispatch(layoutActions.setAvailableBonus(user));
                dispatch(layoutActions.setAvailableBonusBalance(user));
            }
        } catch (error) {
            toast.error(error?.message);
        }
    };
};
