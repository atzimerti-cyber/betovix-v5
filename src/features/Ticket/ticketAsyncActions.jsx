import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { ticketActions } from './ticketSlice';
import { getLang } from '../../utils/storage';

export const getTicketSettings = (recalc) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.get(`Setting/TicketSettings?lang=${lang.id}&siteid=${import.meta.env.VITE_SITE_ID}`, {
                baseURLOverride: import.meta.env.VITE_WALLET_API_BASE,
            });

            if (response.status !== 200) throw Error();

            dispatch(ticketActions.setTicketSettings(response.data.Contents));

            if (recalc) dispatch(ticketActions.setCalculateTicket());
        } catch (error) {
            toast.error(error?.message);
        }
    };
};

export const getMaxBet = (payload) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `Betting/PostData?action=maxbet&lang=${lang.id}&siteid=31`,
                { data: payload },
                {
                    baseURLOverride: import.meta.env.VITE_BETS_API,
                }
            );

            if (response.status !== 200) throw Error();

            dispatch(ticketActions.setMaxBet(response.data.Contents));
        } catch (error) {
            toast.error(error?.message);
        }
    };
};
