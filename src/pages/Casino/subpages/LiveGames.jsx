import { useEffect, useState } from 'react';

import classes from './SlotGames.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { casinoActions } from '../casinoSlice';
import { getLiveVendors, searchCasino } from '../casinoAsyncActions';

import BlackjackIcon from '../../../assets/svgs/blackjack.svg?react';
import logoAnimation from '../../../assets/images/small-logo-animation.gif';

import FilterBar from '../features/FilterBar';
import useDebounce from '../../../hooks/useDebounce';
import GridGames from '../features/GridGames';

import { translate } from '../../../utils/translations';

const LiveGames = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const searchLoading = useSelector((state) => state.casino.searchLoading);
    const filteredGames = useSelector((state) => state.casino.liveGames);
    const sorting = useSelector((state) => state.casino.sorting);
    const user = useSelector((state) => state.login.user);

    const [searchString, setSearchString] = useState('');
    const debSearchString = useDebounce(searchString);
    const [selectedProviders, setSelectedProviders] = useState([]);
    const [axiosController, setAxiosController] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        setAxiosController(controller);

        dispatch(getLiveVendors(signal));

        return () => dispatch(casinoActions.resetSlots());
    }, []);

    useEffect(() => {
        return () => axiosController && axiosController.abort();
    }, [axiosController]);

    useEffect(() => {
        dispatch(casinoActions.setFilteredGames({}));
        if (!axiosController) return;

        let tags;

        if (selectedProviders.length === 0) {
            tags = ['live'];
            dispatch(searchCasino(axiosController.signal, 1, 28, tags, debSearchString, sorting));
        } else if (selectedProviders.length > 0) {
            tags = [...selectedProviders, 'live'];
            dispatch(searchCasino(axiosController.signal, 1, 28, tags, debSearchString, sorting));
        }

    }, [selectedProviders, debSearchString, axiosController, sorting]);

    return (
        <div className={classes.SlotGames}>
            <FilterBar
                searchString={searchString}
                onChangeSearch={(value) => setSearchString(value)}
                onChangeProviders={(value) => setSelectedProviders(value)}
                placeholder={`${translate('Search for live casino')}...`}
            />

            {searchLoading ? (
                <div className={classes.LoadingContainer}>
                    <img src={logoAnimation} className={classes.MoreLoadingAnimation}></img>
                </div>
            ) : (
                filteredGames && Object.keys(filteredGames).length > 0 &&
                <GridGames
                    collection={filteredGames}
                    icon={<BlackjackIcon />}
                    title={translate('All Live Casino Games')}
                    loading={searchLoading}
                    property='allSlots'
                    providers={selectedProviders}
                    searchString={debSearchString}
                    sorting={sorting}
                    tag={['live']}
                />
            )}
        </div>
    );
};

export default LiveGames;
