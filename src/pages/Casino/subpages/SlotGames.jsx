import { useEffect, useState } from 'react';

import classes from './SlotGames.module.css';

import { useDispatch, useSelector } from 'react-redux'; 
import { casinoActions } from '../casinoSlice';
import { getSlotsVendors, searchCasino } from '../casinoAsyncActions';

import SlotsIcon from '../../../assets/svgs/slots.svg?react';
import logoAnimation from '../../../assets/images/small-logo-animation.gif';

import FilterBar from '../features/FilterBar';
import useDebounce from '../../../hooks/useDebounce';
import GridGames from '../features/GridGames';

import { translate } from '../../../utils/translations';

const SlotGames = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const searchLoading = useSelector((state) => state.casino.searchLoading);
    const filteredGames = useSelector((state) => state.casino.slotGames);
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

        dispatch(getSlotsVendors(signal));

        return () => {
            controller?.abort();
            dispatch(casinoActions.resetSlots());
        };
    }, []);

    useEffect(() => {
        dispatch(casinoActions.setFilteredGames({}));
        if (!axiosController) return;

        let tags;

        if (selectedProviders.length === 0) {
            tags = ['slot'];
            dispatch(searchCasino(axiosController.signal, 1, 28, tags, debSearchString, sorting));
        } else if (selectedProviders.length > 0) {
            tags = [...selectedProviders, 'slot'];
            dispatch(searchCasino(axiosController.signal, 1, 28, tags, debSearchString, sorting));
        }

    }, [selectedProviders, debSearchString, axiosController, sorting]);

    return (
        <div className={classes.SlotGames}>
            <FilterBar
                searchString={searchString}
                onChangeSearch={(value) => setSearchString(value)}
                onChangeProviders={(value) => setSelectedProviders(value)}
                placeholder={`${translate('Search for slots')}...`}
            />

            <>
                {searchLoading ? (
                    <div className={classes.LoadingContainer}>
                       <img src={logoAnimation} className={classes.MoreLoadingAnimation}></img>
                    </div>
                ) : (
                    filteredGames && Object.keys(filteredGames).length > 0 &&
                    <GridGames
                        collection={filteredGames}
                        icon={<SlotsIcon />}
                        title={translate('All Slots')}
                        loading={searchLoading}
                        property='allSlots'
                        providers={selectedProviders}
                        searchString={debSearchString}
                        sorting={sorting}
                        tag={['slot']}
                    />
                )}
            </>
        </div>
    );
};

export default SlotGames;
