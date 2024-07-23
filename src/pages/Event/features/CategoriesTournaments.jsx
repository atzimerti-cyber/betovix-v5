import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Tournament from '../../SportsBook/features/Tournament';
import Accordion2 from '../../../features/UI/Accordion/Accordion2';
import { translateNameWithLang } from '../../../utils/translations';

const CategoriesTournaments = (props) => {
    const [allTournaments, setAllTournaments] = useState(null);

    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const selectedSport = useSelector((state) => state.sportsbook.selectedSport);

    useEffect(() => {
        let at = [];

        props.sport.Categories.forEach((category) => {
            category.Tournaments.forEach((tournament) => {
                const t = { ...tournament, CategoryName: category.Name, CategoryId: category.Id };
                at.push(t);
            });
        });

        setAllTournaments(at);
    }, [props.sport.Categories]);

    return (
        allTournaments &&
        allTournaments.map((tournament, ctIndex) => {
            return (
                <div key={tournament.Id} data-category={`Category:${tournament.CategoryId}`} data-tournament={`Tournament:${tournament.Id}`}>
                    <Accordion2
                        icon={props.sport.icon}
                        title={`${translateNameWithLang(tournament.CategoryName)} / ${translateNameWithLang(tournament.Name)}`}
                        initOpen={ctIndex < 3}
                    >
                        <Tournament tournament={tournament} slice='sportsbook' includePregame={false} includeLive={true} typeList />
                    </Accordion2>
                </div>
            );
        })
    );
};

export default CategoriesTournaments;
