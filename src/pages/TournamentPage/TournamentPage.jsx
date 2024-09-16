import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import classes from './TournamentPage.module.css';
import { sportsbookActions } from '../SportsBook/sportsbookSlice';
import { getTournament } from '../SportsBook/sportsbookAsyncActions';
import SportsBookMenu from '../SportsBook/features/SportsBookMenu';
import Accordion from '../../features/UI/Accordion/Accordion';
import Tournament from '../SportsBook/features/Tournament';
import { appActions } from '../../features/InitApp/appSlice';

import { AnimatePresence } from 'framer-motion';

import BarLoading from '../../features/UI/BarLoading/BarLoading';
const TournamentPage = () => {
    const dispatch = useDispatch();
    const { sportid, categoryid, tournamentid } = useParams();

    const selectedTournament = useSelector((state) => state.sportsbook.selectedTournament);
    const barLoading = useSelector((state) => state.app.barLoading);

    useEffect(() => {
        const sportIdInt = parseInt(sportid);
        const categoryIdInt = parseInt(categoryid);
        const tournamentIdInt = parseInt(tournamentid);
        dispatch(appActions.setBarLoading(true));

        const controller = new AbortController();
        const signal = controller.signal;
        dispatch(getTournament(sportIdInt, categoryIdInt, tournamentIdInt, signal));

        return () => {
            controller.abort();
            dispatch(sportsbookActions.setSelectedTournament(null));
        };
    }, [tournamentid]);

    useEffect(() => {
        
        dispatch(appActions.setBarLoading(false));

    }, [selectedTournament]);

    return (
        <>
        <AnimatePresence>{barLoading && <BarLoading />}</AnimatePresence>

        <div className={classes.PageContent}>
            <div className={classes.SportsBook}>
                <div className={classes.MenuWrapper}>
                    <SportsBookMenu />
                </div>

                <div className={classes.Content}>
                    {selectedTournament && (
                        <Accordion key={selectedTournament.Id} title={selectedTournament.Name.International} initOpen={true}>
                            <Tournament tournament={selectedTournament} slice='sportsbook' includePregame includeLive />
                        </Accordion>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default TournamentPage;
