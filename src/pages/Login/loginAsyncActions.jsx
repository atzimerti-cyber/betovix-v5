import axiosApi from '../../axios-api';

import { loginActions } from './loginSlice';
import { layoutActions } from '../../../src/features/Layout/layoutSlice';

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
            setTimeout(() => {
                dispatch(loginActions.setLoginLoading(false));
                navigate(`${locationPathname}?modal=auth&tab=login`, { replace: true });

                // toast.success('Wow so easy!');
            }, 1000);
        } catch (error) {
            dispatch(loginActions.setLoginLoading(false));
            toast.error('An error has occurred!');
        }
    };
};

export const getUser = () => {
    return async (dispatch) => {
        try {
            const response = await axiosApi.get(`login/State/?lang=en&siteid=${import.meta.env.VITE_SITE_ID}`, {
                // baseURLOverride: import.meta.env.VITE_WALLET_API_BASE,
                baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
            });
            if (response.data.Status.StatusCode !== 200) dispatch(loginActions.logout());
            else {
                // TODO: The rest should come from the backend
                const user = {
                    ...response.data.Contents,

                    profileHidden: false,
                    marketingEmails: true,
                    level: 0,
                    wagered: 500,
                    registered: 1712505696754,
                };
                dispatch(loginActions.setUser(user));
                dispatch(layoutActions.setAvailableBonus(user));
                dispatch(layoutActions.setAvailableBonusBalance(user));
            }
        } catch (error) {
            toast.error(error?.message);
        }
    };
};
