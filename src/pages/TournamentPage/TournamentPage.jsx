import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import classes from './TournamentPage.module.css';
import { sportsbookActions } from '../SportsBook/sportsbookSlice';
import { getTournament } from '../SportsBook/sportsbookAsyncActions';
import SportsBookMenu from '../SportsBook/features/SportsBookMenu';
import Accordion from '../../features/UI/Accordion/Accordion';
import Tournament from '../SportsBook/features/Tournament';

const TournamentPage = () => {
    const dispatch = useDispatch();
    const { sportid, categoryid, tournamentid } = useParams();

    const selectedTournament = useSelector((state) => state.sportsbook.selectedTournament);

    useEffect(() => {
        const sportIdInt = parseInt(sportid);
        const categoryIdInt = parseInt(categoryid);
        const tournamentIdInt = parseInt(tournamentid);

        const controller = new AbortController();
        const signal = controller.signal;
        dispatch(getTournament(sportIdInt, categoryIdInt, tournamentIdInt, signal));

        return () => {
            controller.abort();
            dispatch(sportsbookActions.setSelectedTournament(null));
        };
    }, [tournamentid]);

    return (
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
    );
};

export default TournamentPage;
