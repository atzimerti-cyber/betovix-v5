import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Search.module.css';
import CherriesIcon from '../../assets/svgs/cherries.svg?react';
import { getAllVendors } from '../Casino/casinoAsyncActions';
import { getSlots, getCasinoSearch, getCasinoSearchProviders } from './searchAsyncActions';
import FilterBar from '../Casino/features/FilterBar';
import useDebounce from '../../hooks/useDebounce';
import { searchActions } from '../Search/searchSlice';
import { casinoActions } from '../Casino/casinoSlice';
import CasinoGames from './features/CasinoGames';

const Search = () => {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.search.loading);
    const casinoResults = useSelector((state) => state.search.casinoResults);
    // const filteredGames = useSelector((state) => state.casino.filteredGames);
    // const sorting = useSelector((state) => state.casino.sorting);

    const searchString = useSelector((state) => state.search.searchString);
    const debSearchString = useDebounce(searchString);

    const [selectedProviders, setSelectedProviders] = useState([]);
    const [axiosController, setAxiosController] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setAxiosController(controller);

        dispatch(getAllVendors(signal));

        return () => {
            controller?.abort();
            dispatch(casinoActions.setCasinoVendors(null));
            dispatch(searchActions.reset());
        };
    }, []);

    useEffect(() => {
        if (!axiosController) return;

        dispatch(searchActions.setCasinoResults(null));

        if (debSearchString.trim() === '' && selectedProviders.length === 0) {
            dispatch(getSlots(axiosController.signal, 24, true));
        } else if (selectedProviders.length === 0) {
            dispatch(getCasinoSearch(axiosController.signal, debSearchString));
        } else if (selectedProviders.length > 0) {
            dispatch(getCasinoSearchProviders(axiosController.signal, debSearchString, selectedProviders));
        }
    }, [axiosController, debSearchString, selectedProviders]);

    return (
        <div className={classes.PageContent}>
            <div className={classes.Search}>
                <FilterBar
                    searchString={searchString}
                    onChangeSearch={(value) => dispatch(searchActions.setSearchString(value))}
                    // onChangeProviders={(value) => setSelectedProviders(value)}
                    onChangeProviders={(value) => console.log(value)}
                    placeholder='Search Casino'
                />

                <CasinoGames collection={casinoResults} icon={<CherriesIcon />} title='Search results' loading={loading} searchString={debSearchString} />
            </div>
        </div>
    );
};

export default Search;
