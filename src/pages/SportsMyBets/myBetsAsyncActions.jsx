import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { myBetsActions } from './myBetsSlice';
import { getLang } from '../../utils/storage';

export const getTicketsTable = (page, pageItems, active, signal) => {
    return async (dispatch) => {
        try {
            dispatch(myBetsActions.setTicketsLoading(true));
            const lang = getLang();

            let status = active ? '(Status=-1)' : '(Status=0 OR Status=1 OR Cashout=1)';

            const payload = {
                From: '2024-06-01 00:00:00',
                IsBonus: null,
                Keyword: '',
                Live: ' (Live = 1 OR Live = 0) ',
                Order: 'Placement_asc',
                Page: page,
                PageItems: pageItems,
                PartnerId: null,
                Status: status,
                To: '2024-06-30 23:59:59',
                Type: "( ( len(Type) - len(replace(Type, '~', '')) ) = 0 OR ( len(Type) - len(replace(Type, '~', '')) ) = 1 OR ( len(Type) - len(replace(Type, '~', '')) ) > 1)",
            };

            const response = await axiosApi.post(`MyAffiliate/MyTicketsTable?lang=${lang.id}&siteid=${import.meta.env.VITE_SITE_ID}`, payload, {
                signal: signal,
                baseURLOverride: import.meta.env.VITE_WALLET_API_BASE,
            });
            if (response.data && response.data.Status && response.data.Status.StatusCode !== 200) throw Error();

            dispatch(myBetsActions.setTicketsTable(response.data.Contents));
            dispatch(myBetsActions.setTicketsLoading(false));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(myBetsActions.setTicketsLoading(false));
        }
    };
};

export const getTicketCashouts = (type, period, page, signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `Betting/PostData?action=ticket_cashouts&lang=${lang.id}&siteid=${import.meta.env.VITE_SITE_ID}`,
                { data: `{"type":${type},"period":${period},"page":${page}}` },
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_BETS_API,
                }
            );
            if (response.data && response.data.Status && response.data.Status.StatusCode !== 200) throw Error();

            dispatch(myBetsActions.setTicketCashouts(response.data.Contents));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const getTicketCashoutsUpdates = (type, period, page, signal) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `Betting/PostData?action=ticket_cashouts_updates&lang=${lang.id}&siteid=${import.meta.env.VITE_SITE_ID}`,
                { data: `{"type":${type},"period":${period},"page":${page}}` },
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_BETS_API,
                }
            );
            if (response.data && response.data.Status && response.data.Status.StatusCode !== 200) throw Error();

            dispatch(myBetsActions.setTicketCashouts(response.data.Contents));
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
        }
    };
};

export const cashout = (ticketId, cashoutAmount, signal) => {
    return async (dispatch) => {
        try {
            dispatch(myBetsActions.updateCashedOutResult({ ticketId: ticketId, value: 'loading' }));
            const lang = getLang();

            const response = await axiosApi.post(
                `Betting/PostData?action=make_cashout&lang=${lang.id}&siteid=${import.meta.env.VITE_SITE_ID}`,
                { data: `{"ticketId":${ticketId},"cashoutAmount":${cashoutAmount},"providerId":1}` },
                {
                    signal: signal,
                    baseURLOverride: import.meta.env.VITE_BETS_API,
                }
            );
            if (response.data && response.data.Status && response.data.Status.StatusCode !== 200) throw Error();

            if (response.data.Contents.info && response.data.Contents.info.BreakReason) {
                toast.error(response.data.Contents.info.BreakReason + '. Try again!');
                dispatch(getTicketCashoutsUpdates(1, 1, 1, signal));
                dispatch(myBetsActions.deleteCashedOutResult(ticketId));
            } else {
                toast.success('Cashout successful!');
                dispatch(myBetsActions.updateCashedOutResult({ ticketId: ticketId, value: 'success' }));
            }
        } catch (error) {
            const message = error?.message ? error.message : error;
            if (!error?.code === 'ERR_CANCELED') toast.error(message);
            dispatch(myBetsActions.deleteCashedOutResult(ticketId));
        }
    };
};
