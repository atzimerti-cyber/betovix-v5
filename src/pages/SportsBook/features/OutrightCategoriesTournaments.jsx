import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import OutrightTournament from './OutrightTournament';
import Accordion from '../../../features/UI/Accordion/Accordion';
import { translateNameWithLang } from '../../../utils/translations';

const OutrightCategoriesTournaments = (props) => {
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

    // const getCategoryName = (tournament) => {
    //     const name = tournament.Name.International.split('. Outright')[0];
    //     return `${translate(tournament.CategoryName.International)} / ${translate(name)}`;
    // };

    const getCategoryName = (tournament) => {
        if (!tournament) return '';
        let name = translateNameWithLang(tournament.Name);
        name = name.split('. Outright')[0];
        name = name.split('– Μακροχρόνια')[0];

        return `${translateNameWithLang(tournament.CategoryName)} / ${name}`;
    };

    return (
        allTournaments &&
        allTournaments.map((tournament, ctIndex) => {
            return (
                <Accordion key={tournament.Id} icon={selectedSport.icon} title={getCategoryName(tournament)} initOpen={ctIndex < 3}>
                    <OutrightTournament tournament={tournament} slice={props.slice} />
                </Accordion>
            );
        })
    );
};

export default OutrightCategoriesTournaments;
