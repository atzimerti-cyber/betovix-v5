import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { ticketActions } from './ticketSlice';
import { getLang } from '../../utils/storage';
import config from '../../config';

export const getTicketSettings = (recalc) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`Setting/TicketSettings?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`, {
                baseURLOverride: config.VITE_WALLET_API_BASE,
            });

            if (response.status !== 200) throw Error();

            const ticketSettings = response.data.Contents;
            dispatch(ticketActions.setTicketSettings(ticketSettings));

            if (recalc) dispatch(ticketActions.setCalculateTicket());
        } catch (error) {
            if (error?.code !== 'ERR_NETWORK') toast.error(error?.message);
        }
    };
};

export const getMaxBet = (payload) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `Betting/PostData?action=maxbet&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                { data: payload },
                {
                    baseURLOverride: config.VITE_BETS_API,
                },
            );

            if (response.status !== 200) throw Error();

            dispatch(ticketActions.setMaxBet(response.data.Contents));
        } catch (error) {
            // if (error?.code !== 'ERR_NETWORK') toast.error(error?.message);
        }
    };
};

export const getCalculatedTicket = (payload, callback) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const requests = [
                axiosApi.post(
                    `Betting/PostData?action=calc_ticket&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                    { data: payload },
                    {
                        baseURLOverride: config.VITE_BETS_API,
                    },
                ),
                axiosApi.post(
                    `Betting/PostData?action=calc_systems&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                    { data: payload },
                    {
                        baseURLOverride: config.VITE_BETS_API,
                    },
                ),
            ];

            const responses = await Promise.all(requests);

            // const response = await axiosApi.post(
            //     `Betting/PostData?action=calc_ticket&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
            //     { data: payload },
            //     {
            //         baseURLOverride: config.VITE_BETS_API,
            //     },
            // );

            callback?.(responses[0].data.Contents, responses[1].data.Contents);
        } catch (error) {
            const message = error?.response?.data?.message || error?.message?.error;
            if (error?.code !== 'ERR_NETWORK') toast.error(message);
        }
    };
};

export const getTicketSystems = (payload, callback) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `Betting/PostData?action=calc_systems&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                { data: payload },
                {
                    baseURLOverride: config.VITE_BETS_API,
                },
            );

            callback?.(response.data.Contents);
        } catch (error) {
            const message = error?.response?.data?.message || error?.message?.error;
            if (error?.code !== 'ERR_NETWORK') toast.error(message);
        }
    };
};
