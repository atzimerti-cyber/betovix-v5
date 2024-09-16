import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Tournament.module.css';
import { getTournamentEvents } from '../sportsbookAsyncActions';
import { sportsbookActions } from '../sportsbookSlice';
import EventRow from './EventRow';
import EventRowLive from './EventRowLive';
import EventRowLiveList from './EventRowLiveList';
import { appActions } from '../../../features/InitApp/appSlice';

const Tournament = (props) => {
    const dispatch = useDispatch();

    const tournamentTimeFilter = useSelector((state) => state.sportsbook.tournamentTimeFilter);

    const tournamentEvents = useSelector((state) => state[props.slice].tournamentEvents)[props.tournament.Id];
    const liveState = useSelector((state) => state.live.liveState);
    const addedRemovedEvent = useSelector((state) => state.live.addedRemovedEvent);
    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

    const [sortedEvents, setSortedEvents] = useState([]);
    const [events, setEvents] = useState([]);
    const [liveEventsIds, setLiveEventsIds] = useState(null);


    useEffect(() => {
        let getEventsInterval;
        let controller;

        if (props.includePregame) {
            controller = new AbortController();
            const signal = controller.signal;

            const ids = `${selectedSport.Id},${props.tournament.CategoryId},${props.tournament.Id}`;
            dispatch(getTournamentEvents(props.tournament.Id, ids, props.slice, signal));

            // Reget the events every 2 minutes
            const pollingCallback = () => {
                dispatch(getTournamentEvents(props.tournament.Id, ids, props.slice, signal));
            };
            getEventsInterval = setInterval(pollingCallback, 120000);
        }

        return () => {
            if (props.includePregame) {
                controller.abort();
                if (getEventsInterval) clearInterval(getEventsInterval);
                dispatch(sportsbookActions.removeTournamentEvents(props.tournament.Id));
            }
        };
    }, []);

    useEffect(() => {
        if (props.includeLive) {
            getLiveEventsForTournament();
        }
    }, [addedRemovedEvent]);

    // Sort events based on their time. Only for pregame
    useEffect(() => {
        if (!props.includePregame) return;
        if (!tournamentEvents) return;

        const se = [...tournamentEvents].sort((a, b) => {
            const dateA = new Date(a.Info.DateOfMatch);
            const dateB = new Date(b.Info.DateOfMatch);
            return dateA - dateB;
        });

        setSortedEvents(se);
        setEvents(se);
    }, [tournamentEvents]);

    // filter events if there is a timefilter. Only for pregame
    useEffect(() => {
        if (!props.includePregame) return;
        if (!sortedEvents.length) return;
        if (tournamentTimeFilter === 'All') {
            setEvents(sortedEvents);
            return;
        }

        const hours = tournamentTimeFilter.split('H')[0];
        const hoursMiliseconds = parseInt(hours) * 60 * 60 * 1000;
        const now = new Date();
        const nowMiliseconds = now.getTime();
        const futureLimit = new Date(nowMiliseconds + hoursMiliseconds);

        const filteredEvents = sortedEvents.filter((event) => new Date(event.Info.DateOfMatch).getTime() <= futureLimit);

        setEvents(filteredEvents);
    }, [sortedEvents.length, tournamentTimeFilter]);

    const getLiveEventsForTournament = () => {
        const liveIds = [];
        Object.keys(liveState).forEach((key) => {
            const eventId = parseInt(key);
            const liveEvent = liveState[key];
            if (liveEvent.Info?.TournamentId === props.tournament.Id) liveIds.push(eventId);
        });

        setLiveEventsIds(liveIds);
    };

    return (
        <div className={classes.TournamentContent}>
            {liveEventsIds &&
                liveEventsIds.map((eventId) => {
                    if (props.typeList) return <EventRowLiveList key={eventId} eventId={eventId} />;
                    else return <EventRowLive key={eventId} eventId={eventId} />;
                })}

            {events &&
                events.map((event) => {
                    if (liveState[event.MatchId]) return; // don't add the live events here, even if they are still in the pregame

                    return <EventRow key={event.MatchId} event={event} />;
                })}
        </div>
    );
};

export default Tournament;
