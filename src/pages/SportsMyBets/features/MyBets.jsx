import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import classes from './MyBets.module.css';
import MainButton from '../../../features/UI/Buttons/MainButton';
import { translate } from '../../../utils/translations';
import { getTicketsTable, getTicketCashouts, getTicketCashoutsUpdates } from '../myBetsAsyncActions';
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
    const hasTicketCashouts = useSelector((state) => state.myBets.hasTicketCashouts);

    const [axiosController, setAxiosController] = useState(null);
    const [page, setPage] = useState(1);
    const itemsPerPage = 10;

    // Changing between active, settled bets
    useEffect(() => {
        setPage(1);

        const controller = new AbortController();
        const signal = controller.signal;
        setAxiosController(controller);

        dispatch(getTicketsTable(1, itemsPerPage, props.isActive, signal));

        // TODO: what do the payload's parameters mean?
        if (props.isActive) dispatch(getTicketCashouts(1, 1, 1, signal));

        return () => {
            dispatch(myBetsActions.reset());
            if (axiosController) axiosController.abort();
            clearInterval(timerIdRef.current);
        };
    }, [props.isActive]);

    useEffect(() => {
        if (!axiosController) return;

        clearInterval(timerIdRef.current);
        if (!hasTicketCashouts) return;

        const pollingCallback = () => {
            dispatch(getTicketCashoutsUpdates(1, 1, 1, axiosController.signal));
        };

        timerIdRef.current = setInterval(pollingCallback, 5000);
    }, [hasTicketCashouts, axiosController]);

    // Changing page
    useEffect(() => {
        if (!axiosController) return;

        dispatch(getTicketsTable(page, itemsPerPage, props.isActive, axiosController.signal));
        dispatch(layoutActions.setScrollToTop());
    }, [page]);

    return ticketsLoading ? null : (
        <>
            {ticketsTable?.Total === 0 ? (
                <div className={classes.NoBetsError}>
                    <div className={classes.NoBetsErrorInner}>
                        <span>{translate('You have no active bets')}</span>
                        <MainButton color='primary' onClick={() => navigate('/sportsbook/live')}>
                            {translate('Start Betting')}
                        </MainButton>
                    </div>
                </div>
            ) : (
                <div className={classes.TabsContainer}>
                    {ticketsTable?.Data.map((item) => {
                        return <MyBet key={item.TicketId} item={item} />;
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
