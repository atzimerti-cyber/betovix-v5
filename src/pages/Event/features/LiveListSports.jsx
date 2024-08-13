import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import LiveListSport from './LiveListSport';
import NoImageIcon from '../../../assets/svgs/no-image.svg?react';

const LiveListSports = () => {
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const addedRemovedEvent = useSelector((state) => state.live.addedRemovedEvent);
    const liveState = useSelector((state) => state.live.liveState);
    const allSports = useSelector((state) => state.app.allSports);
    const sportIcons = useSelector((state) => state.app.sportIcons);

    const [sports, setSports] = useState(null);

    // Create the sports with categories and tournaments from liveState. Re-evaluate when a live event is added or removed
    useEffect(() => {
        if (!liveState) return;

        let te = {};
        const result = Object.values(liveState).reduce((acc, match) => {
            if (!match.Info) return acc;
            if (!match.Header) return acc;
            if (!match.Info.SportId) return acc;

            const { SportId, SportName, CategoryId, CategoryName, TournamentId, TournamentName } = match.Info;

            // Create tournament events
            if (!te[TournamentId]) te[TournamentId] = [];
            te[TournamentId].push(match);

            // Ensure sport entry exists
            if (!acc[SportId]) {
                acc[SportId] = {
                    Id: SportId,
                    Name: SportName,
                    slug: SportName?.International.toLowerCase().replace(/ /g, '-'),
                    Count: 0,
                    Categories: [],
                    icon: sportIcons[SportName?.International] || <NoImageIcon />,
                };
            }

            const sportEntry = acc[SportId];
            sportEntry.Count += 1;

            // Ensure category entry exists
            let categoryEntry = sportEntry.Categories.find((c) => c.Id === CategoryId);
            if (!categoryEntry) {
                categoryEntry = { Id: CategoryId, Name: CategoryName, Tournaments: [] };
                sportEntry.Categories.push(categoryEntry);
            }

            // Ensure tournament entry exists
            let tournamentExists = categoryEntry.Tournaments.some((t) => t.Id === TournamentId);
            if (!tournamentExists) {
                categoryEntry.Tournaments.push({ Id: TournamentId, Name: TournamentName });
            }

            return acc;
        }, {});

        const updatedSports = Object.values(result);

        // Create a mapping from all Sports
        const orderMap = allSports.reduce((acc, item) => {
            acc[item.Id] = item.Order;
            return acc;
        }, {});
        // Sort sports based on the order defined in allSports
        const sortedSports = updatedSports.sort((a, b) => {
            return (orderMap[a.Id] || 999999) - (orderMap[b.Id] || 999999);
        });

        setSports(sortedSports);
    }, [addedRemovedEvent]);

    return <>{sports && sports.map((sport) => <LiveListSport key={sport.Id} sport={sport} />)}</>;
};

export default LiveListSports;
