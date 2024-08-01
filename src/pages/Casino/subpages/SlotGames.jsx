import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { casinoActions } from '../casinoSlice';
import classes from './SlotGames.module.css';
import SwiperWithOverlay from '../../../features/UI/MainSwiper/SwiperWithOverlay';
import HeartIcon from '../../../assets/svgs/heart.svg?react';
import NewIcon from '../../../assets/casinoIcons/new.svg?react';
import SlotsIcon from '../../../assets/svgs/slots.svg?react';
import { getSlotsVendors, getGamesWithFilter, getFavoriteGamesToFiltered } from '../casinoAsyncActions';
import FilterBar from '../features/FilterBar';
import useDebounce from '../../../hooks/useDebounce';
import GridGames from '../features/GridGames';
import { translate } from '../../../utils/translations';

const SlotGames = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const searchLoading = useSelector((state) => state.casino.searchLoading);
    const filteredGames = useSelector((state) => state.casino.filteredGames);
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

        if (!debSearchString && selectedProviders.length === 0) {
            dispatch(getFavoriteGamesToFiltered(axiosController?.signal));

            // const newFilter = `{"Page":1,"PageItems":20,"Tag":"slot","Search":"","ProviderId":1,"BrandId":0,"VendorId":0, "NewEntrys":true}`;
            const newFilter = `{"Page":1,"PageItems":20,"Tag":"slot","Search":"","NewEntrys":true}`;
            dispatch(getGamesWithFilter(newFilter, 'newGames', axiosController?.signal));

            // const allFilter = `{"Page":1,"PageItems":24,"Tag":"slot","Search":"","ProviderId":1,"BrandId":0,"VendorId":0}`;
            const allFilter = `{"Page":1,"PageItems":24,"Tag":"slot","Search":""}`;
            dispatch(getGamesWithFilter(allFilter, 'allSlots', axiosController?.signal));
        } else if (!debSearchString && selectedProviders.length > 0) {
            selectedProviders.forEach((providerName) => {
                // const filter = `{"Page":1,"PageItems":24,"Tag":"${providerName}","Search":"","ProviderId":1,"BrandId":0,"VendorId":0}`;
                const filter = `{"Page":1,"PageItems":24,"Tag":"${providerName}","Search":""}`;
                dispatch(getGamesWithFilter(filter, providerName, axiosController?.signal));
            });
        } else if (debSearchString && selectedProviders.length === 0) {
            // const filter = `{"Page":1,"PageItems":24,"Tag":"slot","Search":"${debSearchString}","ProviderId":1,"BrandId":0,"VendorId":0}`;
            const filter = `{"Page":1,"PageItems":24,"Tag":"slot","Search":"${debSearchString}"}`;
            dispatch(getGamesWithFilter(filter, 'searchResults', axiosController?.signal));
        } else if (debSearchString && selectedProviders.length > 0) {
            selectedProviders.forEach((providerName) => {
                // const filter = `{"Page":1,"PageItems":24,"Tag":"${providerName}","Search":"${debSearchString}","ProviderId":1,"BrandId":0,"VendorId":0}`;
                const filter = `{"Page":1,"PageItems":24,"Tag":"${providerName}","Search":"${debSearchString}"}`;
                dispatch(getGamesWithFilter(filter, providerName, axiosController?.signal));
            });
        }
    }, [selectedProviders, debSearchString, axiosController]);

    const getTitle = (property) => {
        let title = property;

        if (property === 'searchResults') title = translate('Search Results');
        else title = property[0].toUpperCase() + property.slice(1);

        return translate(title);
    };

    return (
        <div className={classes.SlotGames}>
            <FilterBar
                searchString={searchString}
                onChangeSearch={(value) => setSearchString(value)}
                onChangeProviders={(value) => setSelectedProviders(value)}
                placeholder={`${translate('Search for slots')}...`}
            />

            {!debSearchString && selectedProviders.length === 0 && sorting === 'Default Sort' && (
                <>
                    {user && <SwiperWithOverlay title={translate('Favorites')} icon={<HeartIcon />} items={filteredGames.favoriteGames?.Data} max={10} />}
                    <SwiperWithOverlay
                        title={translate('New Games')}
                        icon={<NewIcon className={classes.NewIcon} />}
                        items={filteredGames.newGames?.Data}
                        max={10}
                    />
                    <GridGames
                        collection={filteredGames.allSlots}
                        icon={<SlotsIcon />}
                        title={translate('All Slots')}
                        loading={searchLoading}
                        property='allSlots'
                    />
                </>
            )}

            {/* TODO: Sorting is not working at the moment. Has to be a parameter of the getGamesWithFilter */}
            {!debSearchString && selectedProviders.length === 0 && sorting !== 'Default Sort' && (
                <GridGames
                    collection={filteredGames.allSlots}
                    icon={<SlotsIcon />}
                    title={translate('All Slots')}
                    loading={searchLoading}
                    property='allSlots'
                />
            )}

            {(debSearchString && selectedProviders.length < 2) || (!debSearchString && selectedProviders.length === 1)
                ? Object.keys(filteredGames).map((key, index) => {
                      return (
                          <GridGames
                              key={index}
                              collection={filteredGames[key]}
                              icon={<SlotsIcon />}
                              title={getTitle(key)}
                              loading={searchLoading}
                              property={key}
                              searchString={debSearchString}
                          />
                      );
                  })
                : null}

            {selectedProviders.length > 1 &&
                selectedProviders.map((key, index) => {
                    return filteredGames[key] && filteredGames[key].Total === 0 ? (
                        <div key={index}>
                            <div className={classes.Header}>
                                <SlotsIcon />
                                <p className={classes.Title}>{getTitle(key)}</p>
                            </div>
                            <p className={classes.NoResults}>{searchString ? `${translate('No results with')} '${searchString}'` : translate('No results')}</p>
                        </div>
                    ) : (
                        <SwiperWithOverlay
                            key={index}
                            title={getTitle(key)}
                            icon={<SlotsIcon />}
                            items={filteredGames[key]?.Data}
                            max={24}
                            task={() => setSelectedProviders([key])}
                            text={filteredGames[key] ? `${filteredGames[key]?.Total} ${translate('Games')}` : ''}
                        />
                    );
                })}
        </div>
    );
};

export default SlotGames;
