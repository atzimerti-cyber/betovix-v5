import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Tournament from './Tournament';
import Accordion from '../../../features/UI/Accordion/Accordion';
import { translateNameWithLang } from '../../../utils/translations';

const CategoriesTournaments = (props) => {
    const [allTournaments, setAllTournaments] = useState(null);

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const tournamentSearchString = useSelector((state) => state.sportsbook.tournamentSearchString);
    const tournamentSort = useSelector((state) => state.sportsbook.tournamentSort);
    const tournamentTimeFilter = useSelector((state) => state.sportsbook.tournamentTimeFilter);

    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

    useEffect(() => {
        let at = [];

        props.categories.forEach((category) => {
            at = [...at, ...category.Tournaments];
        });

        if (tournamentSort !== 'Default Sort') updateSorting(at);
        else setAllTournaments(at);
    }, [props.categories, tournamentSearchString, tournamentTimeFilter]);

    useEffect(() => {
        if (!allTournaments) return;

        const sorted = [...allTournaments];
        updateSorting(sorted);
    }, [tournamentSort]);

    const updateSorting = (at) => {
        if (tournamentSort === 'Default Sort') at.sort((a, b) => a.Id - b.Id);
        else if (tournamentSort === 'A - Z')
            at.sort((a, b) =>
                `${a.CategoryName.International} / ${a.Name.International}`.localeCompare(`${b.CategoryName.International} / ${b.Name.International}`)
            );
        else if (tournamentSort === 'Z - A')
            at.sort((a, b) =>
                `${b.CategoryName.International} / ${b.Name.International}`.localeCompare(`${a.CategoryName.International} / ${a.Name.International}`)
            );

        setAllTournaments(at);
    };

    return (
        allTournaments &&
        allTournaments.map((tournament, ctIndex) => {
            return (
                <div key={tournament.Id} data-category={`Category:${tournament.CategoryId}`} data-tournament={`Tournament:${tournament.Id}`}>
                    <Accordion
                        icon={selectedSport.icon}
                        title={`${translateNameWithLang(tournament.CategoryName)} / ${translateNameWithLang(tournament.Name)}`}
                        initOpen={ctIndex < 3}
                    >
                        <Tournament tournament={tournament} slice={props.slice} includePregame={props.includePregame} includeLive={props.includeLive} />
                    </Accordion>
                </div>
            );
        })
    );
};

export default CategoriesTournaments;
