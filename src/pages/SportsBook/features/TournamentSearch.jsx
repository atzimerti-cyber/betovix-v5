import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './TournamentSearch.module.css';
import Search2 from '../../../features/Search/Search2';
import useDebounce from '../../../hooks/useDebounce';
import { sportsbookActions } from '../sportsbookSlice';
import { translate } from '../../../utils/translations';

const TournamentSearch = (props) => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const [searchString, setSearchString] = useState(null);
    const debSearchString = useDebounce(searchString);

    useEffect(() => {
        let ss = debSearchString;
        if (ss?.trim() === '') ss = null;

        dispatch(sportsbookActions.setTournamentSearchString(ss));
    }, [debSearchString]);

    return (
        <div className={props.withMargin ? [classes.TournamentSearch, classes.WithSearch].join(' ') : classes.TournamentSearch}>
            <Search2 placeholder={translate('Search for tournaments')} onChange={(value) => setSearchString(value)} />
        </div>
    );
};

export default TournamentSearch;
