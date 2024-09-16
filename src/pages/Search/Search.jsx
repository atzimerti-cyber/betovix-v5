import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Search.module.css';
import CherriesIcon from '../../assets/svgs/cherries.svg?react';
import { getAllVendors } from '../Casino/casinoAsyncActions';
import { getSlots, getCasinoSearch, getCasinoSearchProviders, searchCasino } from './searchAsyncActions';
import FilterBar from '../Casino/features/FilterBar';
import useDebounce from '../../hooks/useDebounce';
import { searchActions } from '../Search/searchSlice';
import { casinoActions } from '../Casino/casinoSlice';
import CasinoGames from './features/CasinoGames';
import CasinoMenu from '../Casino/features/CasinoMenu';

const Search = () => {
    const dispatch = useDispatch();

    const loading = useSelector((state) => state.search.loading);
    const casinoResults = useSelector((state) => state.search.casinoResults);
    // const filteredGames = useSelector((state) => state.casino.filteredGames);

    const sorting = useSelector((state) => state.casino.sorting);
    // const sorting = 'Default';
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
        const searchParams = new URLSearchParams(location.search);
        const provider = searchParams.get('provider');
        if (provider) {
            const providerArray = provider.split(',');
            setSelectedProviders(providerArray);
            dispatch(searchActions.setSearchSelectedProviders(providerArray));
        }
    }, [dispatch]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (selectedProviders.length > 0) {
            searchParams.set('provider', selectedProviders);
        } else {
            searchParams.delete('provider');
        }

        const newUrl = `${location.pathname}?${searchParams.toString()}`;
        window.history.replaceState(null, '', newUrl);

    }, [selectedProviders, location]);

    useEffect(() => {
        if (!axiosController) return;

        dispatch(searchActions.setCasinoResults(null));

        if (debSearchString.trim() === '' && selectedProviders.length === 0) {
            // dispatch(getSlots(axiosController.signal, 24, true));
            dispatch(searchCasino(axiosController.signal, 1, 24, selectedProviders, debSearchString, sorting, true));
        } else if (selectedProviders.length === 0) {
            //dispatch(getCasinoSearch(axiosController.signal, debSearchString));
            dispatch(searchCasino(axiosController.signal, 1, 24, selectedProviders, debSearchString, sorting, true));
        } else if (selectedProviders.length > 0) {
            // dispatch(getCasinoSearchProviders(axiosController.signal, 24, debSearchString, selectedProviders));
            dispatch(searchCasino(axiosController.signal, 1, 24, selectedProviders, debSearchString, sorting, true));
        }
    }, [axiosController, debSearchString, selectedProviders, sorting]);

    return (
        <div className={classes.Content}>
            <CasinoMenu />
            <div className={classes.PageContent}>
                <div className={classes.Search}>
                    <FilterBar
                        searchString={searchString}
                        onChangeSearch={(value) => dispatch(searchActions.setSearchString(value))}
                        onChangeProviders={(value) => setSelectedProviders(value)}
                        placeholder='Search Casino'

                    />

                    {casinoResults ?
                        (casinoResults.Data.length !== 0 ?
                            (
                                selectedProviders.length === 0 ?
                                    (
                                        <CasinoGames
                                            collection={casinoResults}
                                            icon={<CherriesIcon />}
                                            title="Search results"
                                            loading={loading}
                                            searchString={debSearchString}
                                            sorting={sorting}
                                        />
                                    ) : (
                                        <CasinoGames
                                            collection={casinoResults}
                                            icon={<CherriesIcon />}
                                            title={selectedProviders.join(', ')}
                                            loading={loading}
                                            searchString={debSearchString}
                                            providers={casinoResults?.providers}
                                            sorting={sorting}
                                        />
                                    )
                            ) : (
                                <p>No Results</p>
                            )
                        ) : (
                            null
                        )
                    }

                </div>
            </div>
        </div>

    );
};

export default Search;
