import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { betslipActions } from './betslipSlice';
import { getLang } from '../../utils/storage';
import { getUser } from '../../pages/Login/loginAsyncActions';

export const getTicketUpdates = (payload) => {
    return async (dispatch, getState) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `Betting/PostData?action=ticket_updates&lang=${lang.id}&siteid=${import.meta.env.VITE_SITE_ID}`,
                { data: payload },
                {
                    baseURLOverride: import.meta.env.VITE_BETS_API,
                }
            );

            if (response.status !== 200) throw Error();

            if (response.data.Contents && response.data.Contents.Points && response.data.Contents.Points.length) {
                const currentState = getState().betslip;
                const slips = currentState.slips;

                let changesWereMade = false;
                response.data.Contents.Points.forEach((point) => {
                    const found = slips.find((s) => s.FieldId === point.FieldId);
                    if (found) {
                        const oldOdd = found.Odd;
                        const newOdd = parseFloat(point.Odd);
                        if (oldOdd !== newOdd) {
                            dispatch(betslipActions.updateSlipOdds({ fieldId: found.FieldId, newOdd: newOdd }));
                            changesWereMade = true;
                        }
                    }
                });
            }
        } catch (error) {
            toast.error(error?.message);
        }
    };
};

export const placeBet = (payload, slips, amounts, betType) => {
    return async (dispatch) => {
        try {
            dispatch(betslipActions.setPlacingBetLoading(true));
            const lang = getLang();

            const response = await axiosApi.post(
                `Betting/PostData?action=buyticket&lang=${lang.id}&siteid=${import.meta.env.VITE_SITE_ID}`,
                { data: payload },
                {
                    baseURLOverride: import.meta.env.VITE_STORETUBE,
                    // baseURLOverride: import.meta.env.VITE_BETS_API,
                }
            );
            if (response.status !== 200) throw Error();

            if (response.data.Contents.Message !== 'Success') {
                toast.error(response.data.Contents.Message);
            }

            dispatch(getUser());
            dispatch(
                betslipActions.setShowReceiptFor({
                    slips: slips,
                    amounts: amounts,
                    betType: betType,
                    type: 'success',
                })
            );
            dispatch(betslipActions.reset());
            dispatch(betslipActions.setPlacingBetLoading(false));
        } catch (error) {
            dispatch(
                betslipActions.setShowReceiptFor({
                    slips: slips,
                    amounts: amounts,
                    betType: betType,
                    type: 'error',
                    message: error,
                })
            );
            dispatch(betslipActions.setPlacingBetLoading(false));
        }
    };
};
