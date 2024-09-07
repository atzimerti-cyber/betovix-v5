import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import useIntersectionObserver from '../../hooks/IntersectionObserver';
import classes from './Home.module.css';
import HomeBanners from './features/HomeBanners';
import Banners from '../../features/Banners/Banners';
import LiveEvents from './features/LiveEvents';
import TopEvents from './features/TopEvents';
//import { getHome } from './homeAsyncActions';
import { homeActions } from './homeSlice';
import { getEventsTop } from './homeAsyncActions';
import { recRewards } from '../UserGamification.jsx/gamificationAsyncActions';
import { getBanners } from './homeAsyncActions';
import { getCasinoFavs } from './homeAsyncActions';
import SwiperWithOverlay from '../../features/UI/MainSwiper/SwiperWithOverlay';
import ClockIcon from '../../assets/svgs/clock.svg?react';
import HeartIcon from '../../assets/svgs/heart.svg?react';
import NewIcon from '../../assets/casinoIcons/new.svg?react';
import VipProgress from './features/VipProgress';
import RegisterContainers from './features/RegisterContainers';
import Crypto from './features/Crypto';
import { translate } from '../../utils/translations';
import ManualRewards from '../UserGamification.jsx/features/ManualRewards';
//const LiveEvents = React.lazy(() => import('./features/LiveEvents'));

function ObjectHasValue(obj) {

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return true
        }
    }
    return false
}
const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const [axiosSignal, setAxiosSignal] = useState(null);

    // const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
    const isMobile = useMediaQuery({ query: '(max-width: 575px)' });
    const isTablet = useMediaQuery({ query: '(max-width: 768px)' });
    const isDesktop = useMediaQuery({ query: '(max-width: 992px)' });
    const isBigDesktop = useMediaQuery({ query: '(max-width: 1200px)' });

    let slidesPerView = 6;
    let slidesPerGroup = 4;

    if (isMobile) {
        slidesPerView = 2.5;
        slidesPerGroup = 2;
    } else if (isTablet) {
        slidesPerView = 3;
        slidesPerGroup = 3;
    } else if (isDesktop) {
        slidesPerView = 3.5;
        slidesPerGroup = 3;
    } else if (isBigDesktop) {
        slidesPerView = 4;
        slidesPerGroup = 4;
    }

    const filteredGames = useSelector((state) => state.casino.filteredGames);
    const user = useSelector((state) => state.login.user);
    const permissions = useSelector((state) => state.login.permissions);
    const sportBanners = useSelector((state) => state.home.sportBanners);
    const hasHero = useSelector((state) => state.gamification.selectedHero);
    const topEvents = useSelector((state) => state.home.eventsTop);
    const casinoFavs = useSelector((state) => state.home.casinoFavs);
    const liveState = useSelector((state) => state.live.liveState);
    const manualRewards = useSelector((state) => state.gamification.manualRewards);

    // useEffect(() => {
    //     const controller = new AbortController();
    //     const signal = controller.signal;
    //     setAxiosSignal(signal);

    //     dispatch(getHome(signal));

    //     return () => {
    //         controller.abort();
    //         dispatch(homeActions.reset());
    //     };
    // }, [user?.AccountId]);

    // Observers
    // const divs = [{ ref: useRef(null), type: 'getEventsTop' }];

    // useEffect(() => {
    //     const observer = new IntersectionObserver(
    //         (entries) => {
    //             entries.forEach((entry) => {
    //                 if (entry.isIntersecting) {
    //                     const divInfo = divs.find((div) => div.ref.current === entry.target);
    //                     if (
    //                         divInfo
    //                         // && !data[divInfo.api]
    //                     ) {
    //                         // if (divInfo.type === 'getEventsLive') dispatch(getEventsLive(axiosSignal));
    //                         if (divInfo.type === 'getEventsTop') dispatch(getEventsTop(axiosSignal));
    //                     }
    //                     observer.unobserve(entry.target); // Optionally stop observing
    //                 }
    //             });
    //         },
    //         {
    //             root: null,
    //             threshold: 0.2, // Adjust threshold as needed
    //         }
    //     );

    //     // Observing all divs
    //     divs.forEach((div) => {
    //         if (div.ref.current) {
    //             observer.observe(div.ref.current);
    //         }
    //     });

    //     return () => {
    //         observer.disconnect();
    //     };
    // }, [divs]);

    const hasNewGames = filteredGames.newGames?.Data?.length > 0;
    const hasRecentGames = filteredGames.recentGames?.Data?.length > 0;
    const hasFavoriteGames = casinoFavs?.length > 0;
    const hasRewards = (manualRewards && ObjectHasValue(manualRewards)) ? true : false;
    const hasBanners = (sportBanners && sportBanners.Banners) ? sportBanners.Banners.length > 0 : false;
    const hasTopEvents = (topEvents) ? topEvents.length > 0 : false;
    const hasLiveEvents = ObjectHasValue(liveState);

    const { isVisible: isBannersVisible, elementRef: bannersRef } = useIntersectionObserver();
    const { isVisible: isLiveEventsVisible, elementRef: liveEventsRef } = useIntersectionObserver();
    const { isVisible: isTopEventsVisible, elementRef: topEventsRef } = useIntersectionObserver();
    const { isVisible: isFavoritesVisible, elementRef: favoritesRef } = useIntersectionObserver();
    const { isVisible: isRewardsVisible, elementRef: rewardsRef } = useIntersectionObserver();

    useEffect(() => {
        const controller = new AbortController();
        return () => {
            controller.abort();
            dispatch(homeActions.reset());
        };
    }, []);

    useEffect(() => {

        if ((permissions.AllowToCasino || permissions.AllowToSlots) && isFavoritesVisible) dispatch(getCasinoFavs());
        if (isBannersVisible) dispatch(getBanners());
        if (isTopEventsVisible) dispatch(getEventsTop());
        if (isRewardsVisible) dispatch(recRewards());

    }, [isTopEventsVisible, isFavoritesVisible, isBannersVisible, isRewardsVisible]);


    useEffect(() => {

        if (isBannersVisible && hasBanners === false && sportBanners !== null) bannersRef.current.remove();
        if (isTopEventsVisible && hasTopEvents === false && topEvents !== null) topEventsRef.current.remove();
        if (isLiveEventsVisible && hasLiveEvents === false) liveEventsRef.current.remove();
        if (isFavoritesVisible && hasFavoriteGames === false && casinoFavs !== null) favoritesRef.current.remove();
        if (isRewardsVisible && hasRewards === false && manualRewards !== null) rewardsRef.current.remove();

    }, [hasBanners, hasTopEvents, hasLiveEvents, hasFavoriteGames, hasRewards]);


    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    return (
        <div className={classes.PageContent}>
            <div className={classes.Home}>

                {/* CRYPTO */}
                {user &&
                    <div style={{ marginTop: '0.5rem', minHeight: "60px" }}>
                        <Crypto />
                    </div>
                }

                {/* BANNERS */}
                {<div ref={bannersRef} style={{ minHeight: "60px" }} >

                    {isBannersVisible && hasBanners &&
                        <div className={isMobile || (isTablet) ? [classes.BannersContent, classes.AdjustMargins].join(' ') : classes.BannersContent}>
                            <Banners banners={sportBanners} />

                            {!isMobile && user && hasHero && (
                                <div className={classes.VipContainer}>
                                    <VipProgress />
                                </div>
                            )}

                            {!user && <RegisterContainers />}
                        </div>
                    }

                </div>}

                {/* TOP EVENTS */}
                {permissions.AllowToSports && (
                    <div ref={topEventsRef} style={{ minHeight: "160px" }}>
                        {isTopEventsVisible && hasTopEvents &&
                            <TopEvents />
                        }
                    </div>
                )
                }

                {/* LIVE EVENTS */}
                {permissions.AllowToSports && (
                    <div ref={liveEventsRef} style={{ minHeight: "218px" }} >
                        {isLiveEventsVisible && hasLiveEvents &&
                            <LiveEvents />
                        }
                    </div >
                )}

                {/* FAVORITES */}
                <div ref={favoritesRef} style={{ minHeight: "164px" }}  >
                    {isFavoritesVisible && hasFavoriteGames && (
                        <SwiperWithOverlay
                            title={translate('Favorites')}
                            icon={<HeartIcon />}
                            link='/casino/favorites'
                            items={casinoFavs}
                            slidesPerView={slidesPerView}
                        />
                    )}
                </div>

                {/* REWARDS */}
                <div ref={rewardsRef} style={{ minHeight: "60px" }}>
                    {isRewardsVisible && user && hasRewards && (
                        <div className={classes.ManualRewards} onClick={() => addParamsToUrl('your-progress')}>
                            <ManualRewards />
                        </div>
                    )}
                </div>





                {/* 
                <div className={isMobile || (isTablet && !user) ? [classes.BannersContent, classes.AdjustMargins].join(' ') : classes.BannersContent}>
                    {(isMobile === false || user === null) && <Banners banners={sportBanners} />}

                    {!isMobile && user && (
                        <div className={classes.VipContainer}>
                            <VipProgress />
                        </div>
                    )}

                    {!user && <RegisterContainers />}
                </div>

                {user && hasHero && Object.keys(hasHero).length > 0 && (
                    <div className={classes.ManualRewards} onClick={() => addParamsToUrl('your-progress')}>
                        <ManualRewards />
                    </div>
                )}


                {permissions.AllowToSports && (
                    <>
                        <div ref={liveEventsRef}>
                            {isLiveEventsVisible && <LiveEvents />}
                        </div>
                     
                        <div ref={topEventsRef}>
                            {isTopEventsVisible && <TopEvents />}
                        </div>
                    </>
                )}

                {permissions.AllowToCasino || permissions.AllowToSlots
                    ? hasNewGames && (
                        <div ref={swiperRef}>
                            {isSwiperVisible && (<SwiperWithOverlay
                                title={translate('New Games')}
                                icon={<NewIcon className={classes.NewIcon} />}
                                link='/casino/slots'
                                items={filteredGames.newGames?.Data}
                                slidesPerView={slidesPerView}
                            />)}
                        </div>
                    )
                    : null
                }

                {user && (permissions.AllowToCasino || permissions.AllowToSlots) ? (
                    <>
                        {hasRecentGames && (
                            <SwiperWithOverlay
                                title={translate('Recently Played')}
                                icon={<ClockIcon />}
                                items={filteredGames.recentGames?.Data}
                                slidesPerView={slidesPerView}
                            />
                        )}
                        <div ref={favoritesRef}>
                            {hasFavoriteGames && isFavoritesVisible && (
                                <SwiperWithOverlay
                                    title={translate('Favorites')}
                                    icon={<HeartIcon />}
                                    link='/casino/favorites'
                                    items={filteredGames.favoriteGames?.Data}
                                    slidesPerView={slidesPerView}
                                />
                            )}
                        </div>
                    </>
                ) : null}

                 */}
            </div>
        </div>
    );
};

export default Home;
