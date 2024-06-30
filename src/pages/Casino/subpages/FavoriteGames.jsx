import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import { casinoActions } from '../casinoSlice';
import classes from './FavoriteGames.module.css';
import SwiperWithOverlay from '../../../features/UI/MainSwiper/SwiperWithOverlay';
import HeartIcon from '../../../assets/svgs/heart.svg?react';
import SlotsIcon from '../../../assets/svgs/slots.svg?react';
import { getFavoritesPage } from '../casinoAsyncActions';
import FilterBar from '../features/FilterBar';
import useDebounce from '../../../hooks/useDebounce';
import GridGames from '../features/GridGames';
import { translate } from '../../../utils/translations';

const FavoriteGames = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const filteredGames = useSelector((state) => state.casino.filteredGames);
    const sorting = useSelector((state) => state.casino.sorting);
    const allCasinoVendors = useSelector((state) => state.app.allCasinoVendors);
    const user = useSelector((state) => state.login.user);

    const [searchString, setSearchString] = useState('');
    const debSearchString = useDebounce(searchString);
    const [selectedProviders, setSelectedProviders] = useState([]);

    const [gamesObj, setGamesObj] = useState({});

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        dispatch(getFavoritesPage(signal));

        return () => {
            controller.abort();
            dispatch(casinoActions.resetSlots());
        };
    }, []);

    useEffect(() => {
        if (!filteredGames.favoriteGames) return;

        let favoriteVendors = [];
        allCasinoVendors.forEach((vendor) => {
            const vendorGames = filteredGames.favoriteGames.Data.filter((g) => g.Data.VendorName === vendor.Data.Name);
            if (vendorGames.length) {
                favoriteVendors.push({
                    ...vendor,
                    GameCount: vendorGames.length,
                });
            }
        });

        dispatch(casinoActions.setCasinoVendors(favoriteVendors));
    }, [filteredGames]);

    useEffect(() => {
        if (!filteredGames.favoriteGames) return;

        setGamesObj({});

        let updatedGamesData = [];
        let updatedGamesObj = {};

        if (selectedProviders.length === 0) {
            updatedGamesData = debSearchString
                ? filteredGames.favoriteGames.Data.filter((g) => g.Data.Name.toLowerCase().includes(debSearchString.toLowerCase()))
                : [...filteredGames.favoriteGames.Data];

            updatedGamesObj = {
                favoriteGames: {
                    Data: updatedGamesData,
                    Total: updatedGamesData.length,
                },
            };
        } else if (selectedProviders.length > 0) {
            selectedProviders.forEach((provider) => {
                const providerGames = filteredGames.favoriteGames.Data.filter(
                    (g) => g.Data.Tags.toLowerCase().includes(provider.toLowerCase()) && g.Data.Name.toLowerCase().includes(debSearchString.toLowerCase())
                );

                updatedGamesObj[provider] = {
                    Data: providerGames,
                    Total: providerGames.length,
                };
            });
        }

        const sorted = getSorted(updatedGamesObj);

        setGamesObj(sorted);
    }, [filteredGames, selectedProviders, debSearchString, sorting]);

    const getSorted = (updatedGamesObj) => {
        Object.keys(updatedGamesObj).forEach((key) => {
            if (sorting === 'Default Sort') updatedGamesObj[key].Data.sort((a, b) => a.Data.Id - b.Data.Id);
            else if (sorting === 'A - Z') updatedGamesObj[key].Data.sort((a, b) => a.Data.Name.localeCompare(b.Data.Name));
            else if (sorting === 'Z - A') updatedGamesObj[key].Data.sort((a, b) => b.Data.Name.localeCompare(a.Data.Name));
        });

        return updatedGamesObj;
    };

    const getTitle = (property) => {
        return property && property[0].toUpperCase() + property.slice(1);
    };

    return user ? (
        <div className={classes.SlotGames}>
            <FilterBar
                searchString={searchString}
                onChangeSearch={(value) => setSearchString(value)}
                onChangeProviders={(value) => setSelectedProviders(value)}
                placeholder={`${translate('Search for favorites')}...`}
            />

            {selectedProviders.length === 0 && (
                <GridGames
                    collection={gamesObj.favoriteGames}
                    icon={<HeartIcon />}
                    title={debSearchString ? translate('Search Results') : translate('Favorites')}
                    loading={false}
                    property='favoriteGames'
                />
            )}

            {selectedProviders.length === 1 && (
                <GridGames
                    collection={gamesObj[selectedProviders[0]]}
                    icon={<HeartIcon />}
                    title={getTitle(selectedProviders[0])}
                    loading={false}
                    property={selectedProviders[0]}
                />
            )}

            {selectedProviders.length > 1 &&
                selectedProviders.map((key, index) => {
                    return gamesObj[key] && gamesObj[key].Total === 0 ? (
                        <div key={index}>
                            <div className={classes.Header}>
                                <SlotsIcon />
                                <p className={classes.Title}>{getTitle(key)}</p>
                            </div>
                            <p className={classes.NoResults}>{searchString ? `No results with '${searchString}'` : 'No results'}</p>
                        </div>
                    ) : (
                        <SwiperWithOverlay
                            key={index}
                            title={getTitle(key)}
                            icon={<SlotsIcon />}
                            items={gamesObj[key]?.Data}
                            max={24}
                            task={() => setSelectedProviders([key])}
                            text={gamesObj[key] ? `${gamesObj[key]?.Total} Games` : ''}
                        />
                    );
                })}
        </div>
    ) : (
        <Navigate replace to={'/casino/lobby'} />
    );
};

export default FavoriteGames;
