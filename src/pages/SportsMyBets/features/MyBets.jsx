import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import classes from './MyBets.module.css';
import MainButton from '../../../features/UI/Buttons/MainButton';
import { translate } from '../../../utils/translations';
import { getTicketCashouts, getTicketCashoutsUpdates } from '../myBetsAsyncActions';
import { myBetsActions } from '../myBetsSlice';
import MyBet from './MyBet';
import { layoutActions } from '../../../features/Layout/layoutSlice';

const MyBets = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const timerIdRef = useRef(null);

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const ticketsLoading = useSelector((state) => state.myBets.ticketsLoading);
    const ticketsTable = useSelector((state) => state.myBets.ticketsTable);

    const [axiosController, setAxiosController] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 4;

    // Changing between active, settled bets
    useEffect(() => {
        setPage(1);

        const controller = new AbortController();
        const signal = controller.signal;
        setAxiosController(controller);

        const page = 1;
        let cashoutType = 3;
        if (props.isActive) cashoutType = 1;

        dispatch(getTicketCashouts(cashoutType, page, signal, props.isActive));

        return () => {
            dispatch(myBetsActions.reset());
            if (axiosController) axiosController.abort();
            clearInterval(timerIdRef.current);
        };
    }, [props.isActive]);

    useEffect(() => {
        if (!axiosController) return;

        clearInterval(timerIdRef.current);

        if (!props.isActive) return;
        if (!ticketsTable || ticketsTable?.Total === 0) return;

        const pollingCallback = () => {
            dispatch(getTicketCashoutsUpdates(page, axiosController.signal));
        };

        timerIdRef.current = setInterval(pollingCallback, 5000);
    }, [ticketsTable?.Total, axiosController]);

    // Changing page
    useEffect(() => {
        if (!axiosController) return;

        let cashoutType = 3;
        if (props.isActive) cashoutType = 1;

        dispatch(getTicketCashouts(cashoutType, page, axiosController.signal, props.isActive));
        dispatch(layoutActions.setScrollToTop());
    }, [page]);

    return ticketsLoading ? null : (
        <>
            {ticketsTable?.Total === 0 ? (
                <div className={classes.NoBetsError}>
                    <div className={classes.NoBetsErrorInner}>
                        <span>{translate(`You have no ${props.isActive ? 'active' : 'settled'} bets`)}</span>
                        <MainButton color='primary' onClick={() => navigate('/sportsbook/live')}>
                            {translate('Start Betting')}
                        </MainButton>
                    </div>
                </div>
            ) : (
                <div className={classes.TabsContainer}>
                    {ticketsTable?.Data.map((item) => {
                        return <MyBet key={item.Ticket.TicketId} item={item.Ticket} page={page} active={props.isActive} />;
                    })}
                </div>
            )}

            <div className={classes.Pagination}>
                <button disabled={page === 1 ? true : false} onClick={() => setPage((prev) => prev - 1)}>
                    <span>{translate('Previous')}</span>
                </button>
                <button disabled={ticketsTable?.Total > page * itemsPerPage ? false : true} onClick={() => setPage((prev) => prev + 1)}>
                    <span>{translate('Next')}</span>
                </button>
            </div>
        </>
    );
};

export default MyBets;
