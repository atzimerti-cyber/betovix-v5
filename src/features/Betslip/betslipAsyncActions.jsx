import { toast } from 'react-toastify';

import axiosApi from '../../axios-api';
import { betslipActions } from './betslipSlice';
import { getLang } from '../../utils/storage';
import { getUser } from '../../pages/Login/loginAsyncActions';
import config from '../../config';

export const getTicketUpdates = (payload) => {
    return async (dispatch, getState) => {
        try {
            const lang = getLang();

            const response = await axiosApi.post(
                `Betting/PostData?action=ticket_updates&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                { data: payload },
                {
                    baseURLOverride: config.VITE_BETS_API,
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
                `Betting/PostData?action=buyticket&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                { data: payload },
                {
                    baseURLOverride: config.VITE_BETS_API,
                }
            );
            if (response.status !== 200) throw Error(response.data.Contents.Message);

            if (response.data.Contents.Message !== 'Success') {
                // toast.error(response.data.Contents.Message);
                throw Error(response.data.Contents.Message);
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
            dispatch(betslipActions.setTicketId(response.data.Contents.Reciep.ticketId));
            dispatch(betslipActions.reset());
            dispatch(betslipActions.setPlacingBetLoading(false));
        } catch (error) {
            dispatch(
                betslipActions.setShowReceiptFor({
                    slips: slips,
                    amounts: amounts,
                    betType: betType,
                    type: 'error',
                    message: error?.message,
                })
            );
            dispatch(betslipActions.setTicketId(null));
            dispatch(betslipActions.reset());
            dispatch(betslipActions.setPlacingBetLoading(false));
        }
    };
};

export const saveBet = (payload) => {
    return async (dispatch, getState) => {
        try {
            dispatch(betslipActions.setSavingBetLoading(true));
            const lang = getLang();

            const response = await axiosApi.post(
                `Betting/PostData?action=saveticket&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                { data: payload },
                {
                    baseURLOverride: config.VITE_BETS_API,
                }
            );

            if (response.status !== 200) throw Error(response.data.Contents);

            dispatch(betslipActions.setLastBookedBet(response.data.Contents));
            dispatch(betslipActions.setSavingBetLoading(false));

            return response.data.Contents; // Return the response to indicate success
        } catch (error) {
            dispatch(betslipActions.setSavingBetLoading(false));
            toast.error(error?.message);
        }
    };
};

export const loadBooked = (signal, code, callback) => {
    return async (dispatch) => {
        try {
            const lang = getLang();

            const payload = JSON.stringify(code);

            const response = await axiosApi.post(
                `Betting/PostData?action=loadticket&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
                {
                    data: payload,
                },
                {
                    signal: signal,
                    baseURLOverride: config.VITE_BETS_API,
                }
            );

            if (response.data.Status.StatusCode !== 200) throw new Error(response.data.Contents);

            const data = response.data.Contents;
            const ticketData = JSON.parse(JSON.parse(data.json));

            dispatch(betslipActions.resetSlips());

            ticketData.points.forEach((point) => {
                const newSlip = {
                    HomeTeamId: point.HomeTeamId,
                    HomeTeamName: point.HomeTeamName,
                    AwayTeamId: point.AwayTeamId,
                    AwayTeamName: point.AwayTeamName,
                    Active: point.Active,
                    CategoryId: point.CategoryId,
                    CategoryName: point.CategoryName,
                    DateOfMatch: new Date(point.DateOfMatch),
                    FieldId: point.FieldId,
                    FieldName: point.FieldName,
                    FieldTypeId: point.FieldTypeId,
                    Line: point.Line || '',
                    Live: point.Live,
                    MarketName: point.MarketName,
                    MarketTypeId: point.MarketTypeId,
                    MatchId: point.MatchId,
                    Odd: point.Odd,
                    SportId: point.SportId,
                    SportName: point.SportName,
                    MatchName: point.MatchName,
                    TournamentId: point.TournamentId,
                    TournamentName: point.TournamentName,
                };

                dispatch(betslipActions.addToSlips(newSlip));
            });

            if (callback) callback();
        } catch (error) {
            const message = error?.message || 'Error loading bet';
            if (error?.code !== 'ERR_CANCELED') toast.error(message);
        }
    };
};
