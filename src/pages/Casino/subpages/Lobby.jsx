import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import useSlidesResponsive from '../../../hooks/useSlidesResponsive';

import classes from './Lobby.module.css';
import { casinoActions } from '../casinoSlice';
import { getCasino } from '../casinoAsyncActions';
import SwiperWithOverlay from '../../../features/UI/MainSwiper/SwiperWithOverlay';

import VendorSwiper from '../../../features/UI/MainSwiper/VendorSwiper';

import BigSwiper2 from '../../../features/UI/MainSwiper/BigSwiper2';
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

    const { slidesPerView, slidesPerGroup, isMobile, isTablet, isDesktop, isBigDesktop } = useSlidesResponsive("casino");

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

    // const isMobile = useMediaQuery({ query: '(max-width: 375px)' });
    // const isBigMobile = useMediaQuery({ query: '(max-width: 490px)' });
    // const isSmallTablet = useMediaQuery({ query: '(max-width: 650px)' });
    // const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    // const isDesktop = useMediaQuery({ query: '(max-width: 992px)' });
    // const isBigDesktop = useMediaQuery({ query: '(max-width: 1200px)' });

    // let slidesPerView = 7;

    // if (isMobile) {
    //     slidesPerView = 1;
    // } else if (isBigMobile) {
    //     slidesPerView = 1.5;
    // } else if (isSmallTablet) {
    //     slidesPerView = 3;
    // } else if (isTablet) {
    //     slidesPerView = 4;
    // } else if (isDesktop) {
    //     slidesPerView = 5;
    // } else if (isBigDesktop) {
    //     slidesPerView = 7;
    // }



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
            <VendorSwiper title={translate('Our Vendors')} icon={<ProvidersIcon />} link='/search' items={allProviders} slidesPerView={slidesPerView <= 5 ? (slidesPerView + 2) : (slidesPerView + 3)} />

            <BigSwiper2 items={casinoBanners} autoplay />

            {Object.entries(filteredGames).map(([key, menuItem]) => {
                if (menuItem?.Data.length > 0) {
                    return (
                        <SwiperWithOverlay
                            key={key}
                            title={`${translate(menuItem?.Item?.Name)}`}
                            icon={casinoIcons[menuItem?.Item?.Name] || null}
                            link={getPathByItemName(menuItem?.Item?.Name)}
                            items={menuItem?.Data}
                            max={20}
                            slidesPerView={slidesPerView}
                        // slidesPerView={isMobile||isBigMobile ? (slidesPerView + 2):(slidesPerView)}
                        />
                    );
                }
                return null;
            })}
        </>
    );
};

export default Lobby;
