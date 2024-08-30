import { toast } from 'react-toastify';

import { getLang } from '../../utils/storage';
import axiosApi from '../../axios-api';
import { profileActions } from './profileSlice';

export const getOverview = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
                {
                    // data: `{"Page":1,"PageItems":24,"Tag":"slot","Search":"","ProviderId":1,"BrandId":0,"VendorId":0}`,
                    data: `{"Page":1,"PageItems":24,"Tag":"slot","Search":""}`,
                },
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_CASINO_BASE,
                }
            );

            if (response.data.Status.StatusCode !== 200) throw Error();

            dispatch(profileActions.setTopGames(response.data.Contents));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getHeroes = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(
                `/Gamification/GetAllHeroes`,
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
                }
            );

            // if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error('Failed to fetch heroes');
            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error(response.data.Contents);
           
            const heroes = response.data.Contents;
            console.log("All Heroes:", heroes);
            dispatch(profileActions.setHeroes(heroes));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getLevels = (signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `/Payments/PostData?action=GetPaymentMethods&lang=${lang.label}&siteid=${import.meta.env.VITE_SITE_ID}`,
                {
                    data: `{"Id":""}`,
                },
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
                }
            );

            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error('Failed to fetch heroes');
           
            const levels = response.data.Contents;
            console.log("All Levels:", levels);
            dispatch(profileActions.setHeroes(levels));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const changePassword = (signal, payload) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `/MyAffiliate/ChangePassword/&lang=${lang.id}&siteid=${import.meta.env.VITE_SITE_ID}`,
                {
                    OldPass: payload.OldPass,
                    Password: payload.Password,
                    RePassword: payload.RePassword
                },
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_WALLET_STORETUBE,
                }
            );

            if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error('Failed to change password');
           
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

