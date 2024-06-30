import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Tournament from './Tournament';
import Accordion from '../../../features/UI/Accordion/Accordion';
import AccordionSmall from '../../../features/UI/Accordion/AccordionSmall';
import { translate } from '../../../utils/translations';

const Category = (props) => {
    const [categoryTournaments, setCategoryTournaments] = useState([]);

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
    const tournamentSearchString = useSelector((state) => state.sportsbook.tournamentSearchString);
    const tournamentSort = useSelector((state) => state.sportsbook.tournamentSort);
    const tournamentTimeFilter = useSelector((state) => state.sportsbook.tournamentTimeFilter);

    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

    useEffect(() => {
        if (!props.category) return;

        let updatedTournaments = [...props.category.Tournaments];

        if (tournamentSort === 'Default Sort') updatedTournaments.sort((a, b) => a.Id - b.Id);
        else if (tournamentSort === 'A - Z') updatedTournaments.sort((a, b) => a.Name.International.localeCompare(b.Name.International));
        else if (tournamentSort === 'Z - A') updatedTournaments.sort((a, b) => b.Name.International.localeCompare(a.Name.International));

        setCategoryTournaments(updatedTournaments);
    }, [props.category?.Tournaments?.length, tournamentSearchString, tournamentSort, tournamentTimeFilter]);

    return (
        <div data-category={`Category:${props.category.Id}`}>
            <Accordion title={translate(props.category.Name.International)} initOpen={props.initOpen}>
                {categoryTournaments.map((categoryTournament, tournamentIndex) => {
                    return (
                        <div key={categoryTournament.Id} data-tournament={`Tournament:${categoryTournament.Id}`}>
                            <AccordionSmall icon={selectedSport.icon} title={translate(categoryTournament.Name.International)} initOpen={tournamentIndex < 3}>
                                <Tournament
                                    tournament={categoryTournament}
                                    slice={props.slice}
                                    includePregame={props.includePregame}
                                    includeLive={props.includeLive}
                                />
                            </AccordionSmall>
                        </div>
                    );
                })}
            </Accordion>
        </div>
    );
};

export default Category;
