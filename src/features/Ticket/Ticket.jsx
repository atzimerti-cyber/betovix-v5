import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { getTicketSettings, getMaxBet } from './ticketAsyncActions';
import { setTicketToStorage, getTicketFromStorage } from '../../utils/storage';
import { betslipActions } from '../Betslip/betslipSlice';
import { calculate } from '../../utils/ticketCalculator';
import { toast } from 'react-toastify';
import { translate } from '../../utils/translations';
import { ticketActions } from './ticketSlice';

const Ticket = () => {
    const dispatch = useDispatch();

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const ticketSettings = useSelector((state) => state.ticket.ticketSettings);
    const initTicket = useSelector((state) => state.ticket.initTicket);
    const calculateTicket = useSelector((state) => state.ticket.calculateTicket);
    const slips = useSelector((state) => state.betslip.slips);
    const slipUpdated = useSelector((state) => state.betslip.slipUpdated);
    const betType = useSelector((state) => state.betslip.betType);
    const amounts = useSelector((state) => state.betslip.amounts);
    const liveState = useSelector((state) => state.live.liveState);
    const user = useSelector((state) => state.login.user);
    const selectedAccount = useSelector((state) => state.login.selectedAccount);

    useEffect(() => {
        dispatch(getTicketSettings());

        // Get slips from storage
        const storageTicket = getTicketFromStorage();
        if (storageTicket) {
            let storageSlips = storageTicket.points;

            // Update with current condition for each slip
            storageSlips.forEach((slip) => {
                if (liveState[slip.MatchId]) {
                    const market = liveState[slip.MatchId].Markets?.find((m) => m.MarketTypeId === slip.MarketTypeId);
                    if (market && market.MarketFields) {
                        const field = market.MarketFields.find((f) => f.FieldId === slip.FieldId);
                        if (field && field.Value !== slip.Odd) {
                            slip.Odd = field.Value;
                            slip.Active = market.Active && field.Active ? true : false;
                        }
                    }
                }
            });

            dispatch(betslipActions.setSlips(storageSlips));

            // Add stakes amounts
            let updatedAmounts = {};
            const stakes = storageTicket.stakes;
            if (!_.isEmpty(stakes.points)) {
                Object.keys(stakes.points).forEach((pointId) => {
                    updatedAmounts[pointId] = stakes.points[pointId];
                });
            } else if (!_.isEmpty(stakes.systems)) {
                Object.keys(stakes.systems).forEach((systemId) => {
                    updatedAmounts[systemId] = stakes.systems[systemId];
                });
            }
            dispatch(betslipActions.setAmounts(updatedAmounts));
        } else {
            setTicketToStorage(initTicket);
        }
    }, []);

    // When logged in changes, reget ticket settings and calculate ticket
    useEffect(() => {
        if (calculateTicket === 0) return; // don't run at first load

        // If there are slips, then reget the ticket settings (true will rerun the calculate ticket)
        if (slips.length) dispatch(getTicketSettings(true));
    }, [user?.AccountId]);

    // Get maxbet. Triggers update (changes calculateTicket var). TODO: Get isLive from live[slip.MatchId]?
    useEffect(() => {
        if (slips.length === 0) {
            setTicketToStorage(initTicket);
            dispatch(ticketActions.setTicketUpdated());
            return;
        }

        let points = [];
        slips.forEach((slip) => {
            const point = {
                PointId: slip.FieldId,
                MatchId: slip.MatchId,
                SportId: slip.SportId,
                LocationId: slip.CategoryId,
                LeagueId: slip.TournamentId,
                pre: slip.Live ? false : true,
            };
            points.push(point);
        });

        const pointsStr = JSON.stringify(points);

        let payload = `{"tickettype":"${betType}","points":${pointsStr}}`;

        if (selectedAccount && selectedAccount !== null && selectedAccount?.AccountId) {
            payload = `{"tickettype":"${betType}","points":${pointsStr},"ForPlayer":${selectedAccount.AccountId}}`;
        }

        dispatch(getMaxBet(payload));
    }, [slips.length, betType]);

    // Update ticket (triggered on slipUpdated)
    useEffect(() => {
        if (calculateTicket === 0) return;
        if (!ticketSettings) return;

        const ticket = getTicketFromStorage();

        // Remove slips that are not active?
        const activePoints = slips.filter((s) => s.Odd > 0 && s.Active);

        const newTicket = { ...ticket, type: betType, points: activePoints };
        let calculatedTicket = calculate(ticketSettings, newTicket, amounts);

        if (calculatedTicket) {
            setTicketToStorage(calculatedTicket);
            dispatch(ticketActions.setTicketUpdated());
        } else toast.error(translate('Something went wrong!'));
    }, [slipUpdated, ticketSettings, calculateTicket]);

    return <div></div>;
};

export default Ticket;
