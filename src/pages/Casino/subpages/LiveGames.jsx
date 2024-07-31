import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { casinoActions } from '../casinoSlice';
import classes from './SlotGames.module.css';
import SwiperWithOverlay from '../../../features/UI/MainSwiper/SwiperWithOverlay';
import HeartIcon from '../../../assets/svgs/heart.svg?react';
import NewIcon from '../../../assets/casinoIcons/new.svg?react';
import BlackjackIcon from '../../../assets/svgs/blackjack.svg?react';

import { getLiveVendors, getGamesWithFilter, getFavoriteGamesLiveToFiltered } from '../casinoAsyncActions';
import FilterBar from '../features/FilterBar';
import useDebounce from '../../../hooks/useDebounce';
import GridGames from '../features/GridGames';
import { translate } from '../../../utils/translations';

const LiveGames = () => {
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

        dispatch(getLiveVendors(signal));

        return () => dispatch(casinoActions.resetSlots());
    }, []);

    useEffect(() => {
        return () => axiosController && axiosController.abort();
    }, [axiosController]);

    useEffect(() => {
        dispatch(casinoActions.setFilteredGames({}));
        if (!axiosController) return;

        if (!debSearchString && selectedProviders.length === 0) {
            dispatch(getFavoriteGamesLiveToFiltered(axiosController?.signal));

            // const newFilter = `{"Page":1,"PageItems":20,"Tag":"live","Search":"","ProviderId":0,"BrandId":0,"VendorId":0, "NewEntrys":true}`;
            const newFilter = `{"Page":1,"PageItems":20,"Tag":"live","Search":"","NewEntrys":true}`;
            dispatch(getGamesWithFilter(newFilter, 'newGames', axiosController?.signal));

            // const allFilter = `{"Page":1,"PageItems":24,"Tag":"live","Search":"","ProviderId":0,"BrandId":0,"VendorId":0}`;
            const allFilter = `{"Page":1,"PageItems":24,"Tag":"live","Search":""}`;
            dispatch(getGamesWithFilter(allFilter, 'allSlots', axiosController?.signal));
        } else if (!debSearchString && selectedProviders.length > 0) {
            selectedProviders.forEach((providerName) => {
                // const filter = `{"Page":1,"PageItems":24,"Tag":"${providerName}","Search":"","ProviderId":0,"BrandId":0,"VendorId":0}`;
                const filter = `{"Page":1,"PageItems":24,"Tag":"${providerName}","Search":""}`;
                dispatch(getGamesWithFilter(filter, providerName, axiosController?.signal));
            });
        } else if (debSearchString && selectedProviders.length === 0) {
            // const filter = `{"Page":1,"PageItems":24,"Tag":"live","Search":"${debSearchString}","ProviderId":0,"BrandId":0,"VendorId":0}`;
            const filter = `{"Page":1,"PageItems":24,"Tag":"live","Search":"${debSearchString}"}`;
            dispatch(getGamesWithFilter(filter, 'searchResults', axiosController?.signal));
        } else if (debSearchString && selectedProviders.length > 0) {
            selectedProviders.forEach((providerName) => {
                // const filter = `{"Page":1,"PageItems":24,"Tag":"${providerName}","Search":"${debSearchString}","ProviderId":0,"BrandId":0,"VendorId":0}`;
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
                placeholder={`${translate('Search for live casino')}...`}
            />

            {!debSearchString && selectedProviders.length === 0 && sorting === 'Default Sort' && (
                <>
                    {user && <SwiperWithOverlay title='Favorites' icon={<HeartIcon />} items={filteredGames.favoriteGames?.Data} max={10} />}
                    <SwiperWithOverlay title='New Games' icon={<NewIcon className={classes.NewIcon} />} items={filteredGames.newGames?.Data} max={10} />
                    <GridGames
                        collection={filteredGames.allSlots}
                        icon={<BlackjackIcon />}
                        title={translate('All Live Casino Games')}
                        loading={searchLoading}
                        property='allSlots'
                    />
                </>
            )}

            {/* TODO: Sorting is not working at the moment. Has to be a parameter of the getGamesWithFilter */}
            {!debSearchString && selectedProviders.length === 0 && sorting !== 'Default Sort' && (
                <GridGames
                    collection={filteredGames.allSlots}
                    icon={<BlackjackIcon />}
                    title={translate('All Live Casino Games')}
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
                              icon={<BlackjackIcon />}
                              title={getTitle(key)}
                              loading={searchLoading}
                              property={key}
                              searchString={debSearchString}
                          />
                      );
                  })
                : null}

            {selectedProviders.length > 1 &&
                Object.keys(filteredGames).map((key, index) => {
                    return filteredGames[key].Total === 0 ? (
                        <div key={index}>
                            <div className={classes.Header}>
                                <BlackjackIcon />
                                <p className={classes.Title}>{getTitle(key)}</p>
                            </div>
                            <p className={classes.NoResults}>
                                {translate('No results with')} '{searchString}'
                            </p>
                        </div>
                    ) : (
                        <SwiperWithOverlay
                            key={index}
                            title={getTitle(key)}
                            icon={<BlackjackIcon />}
                            items={filteredGames[key].Data}
                            max={24}
                            task={() => setSelectedProviders([key])}
                            text={`${filteredGames[key].Total} ${translate('Games')}`}
                        />
                    );
                })}
        </div>
    );
};

export default LiveGames;
