import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Lobby.module.css';
import { casinoActions } from '../casinoSlice';
import { getCasino } from '../casinoAsyncActions';
import SwiperWithOverlay from '../../../features/UI/MainSwiper/SwiperWithOverlay';

import VendorSwiper from '../../../features/UI/MainSwiper/VendorSwiper';

import BigSwiper2 from '../../../features/UI/MainSwiper/BigSwiper2';
import SlotsIcon from '../../../assets/svgs/slots.svg?react';
import BlackjackIcon from '../../../assets/svgs/blackjack.svg?react';
import ClockIcon from '../../../assets/svgs/clock.svg?react';
import HeartIcon from '../../../assets/svgs/heart.svg?react';
import ProvidersIcon from '../../../assets/casinoIcons/providers.svg?react';
import { translate } from '../../../utils/translations';

const Lobby = () => {
    const dispatch = useDispatch();
    const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations

    const filteredGames = useSelector((state) => state.casino.filteredGames);
    const casinoBanners = useSelector((state) => state.casino.casinoBanners);
    const casinoVendors = useSelector((state) => state.casino.casinoVendors);
    const casinoIcons = useSelector((state) => state.app.casinoIcons);
    const user = useSelector((state) => state.login.user);

    const [allProviders, setAllProviders] = useState([]);

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        dispatch(getCasino(signal));

        return () => {
            controller.abort();
            dispatch(casinoActions.resetLobby());
        };
    }, [user?.AccountId]);

    useEffect(() => {
        if (!casinoVendors) return;

        const po = casinoVendors
            .map((v) => {
                return v;
            })
            .sort((a, b) => a.Data.Name.localeCompare(b.Data.Name));

        setAllProviders(po);
    }, [casinoVendors]);



    const getPathByItemName = (itemName) => {
        switch (itemName) {
            case 'Recommended':
                return null;
            case 'Recently Played':
                return null;
            case 'Favorites':
                return '/casino/favorites';
            case 'New Games':
                return null;
            case 'Amatic':
                return `/search?provider=${itemName}`;
            case 'Novomatic':
                return `/search?provider=${itemName}`;
            case 'Egypt':
                return `/search?provider=egt`;
            default:
                return '/';
        }
    };

    return (
        <>
            <VendorSwiper title={translate('Our Vendors')} icon={<ProvidersIcon />} link='/search' items={allProviders} max={20} />

            <BigSwiper2 items={casinoBanners} max={6} />

            {Object.entries(filteredGames).map(([key, menuItem]) => {
                if (menuItem?.Data.length > 0) {
                    return (
                        <SwiperWithOverlay
                            key={key} // Using key to avoid React warning about unique keys
                            title={`${translate(menuItem?.Item?.Name)}`}
                            icon={casinoIcons[menuItem?.Item?.Name] || null} // Use casinoIcons from the state
                            link={getPathByItemName(menuItem?.Item?.Name)}
                            items={menuItem?.Data}
                            max={20}
                        />
                    );
                }
                return null;
            })}
        </>
    );
};

export default Lobby;
