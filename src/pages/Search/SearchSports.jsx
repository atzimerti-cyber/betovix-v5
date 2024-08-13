import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Search.module.css';
import { getAllVendors } from '../Casino/casinoAsyncActions';
import FilterBar from '../Casino/features/FilterBar';
import useDebounce from '../../hooks/useDebounce';
import { searchActions } from '../Search/searchSlice';
import EventRow from '../SportsBook/features/EventRow';
import { getEventSearch } from './searchAsyncActions';

const SearchSports = () => {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.search.loading);

    const searchString = useSelector((state) => state.search.searchString);
    const events = useSelector((state) => state.search.sportsResults);
    const debSearchString = useDebounce(searchString);

    const [axiosController, setAxiosController] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setAxiosController(controller);

        dispatch(getAllVendors(signal));

        return () => {
            controller?.abort();
            dispatch(searchActions.reset());
        };
    }, []);

    useEffect(() => {
        if (!axiosController) return;

        dispatch(searchActions.setSportsResults(null));

        if (debSearchString.trim() === '') {
            dispatch(getEventSearch(axiosController.signal, 1, searchString));
        }
    }, [axiosController, debSearchString]);

    return (
        <div className={classes.PageContent}>
            <div className={classes.Search}>
                <FilterBar
                    searchString={searchString}
                    onChangeSearch={(value) => dispatch(searchActions.setSearchString(value))}
                    placeholder='Search Event'
                />

                {events &&
                    events.map((event) => {
                        if (liveState[event.MatchId]) return; // don't add the live events here, even if they are still in the pregame

                        return <EventRow key={event.MatchId} event={event} />;
                    })}
            </div>
        </div>
    );
};

export default SearchSports;