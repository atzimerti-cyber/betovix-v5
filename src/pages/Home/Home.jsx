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

import SwiperWithOverlay from '../../features/UI/MainSwiper/SwiperWithOverlay';
import ClockIcon from '../../assets/svgs/clock.svg?react';

import NewIcon from '../../assets/casinoIcons/new.svg?react';
import VipProgress from './features/VipProgress';
import RegisterContainers from './features/RegisterContainers';
import Crypto from './features/Crypto';

import ManualRewards from '../UserGamification.jsx/features/ManualRewards';
import CasinoFavorites from '../../features/CasinoFavorites/CasinoFavorites';
//const LiveEvents = React.lazy(() => import('./features/LiveEvents'));
import useSlidesResponsive from '../../hooks/useSlidesResponsive';

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
    const {isMobile,isTablet,isDesktop,isBigDesktop} =useSlidesResponsive();
   

    const filteredGames = useSelector((state) => state.casino.filteredGames);
    const user = useSelector((state) => state.login.user);
    const permissions = useSelector((state) => state.login.permissions);
    //const sportBanners = useSelector((state) => state.home.sportBanners);
    const hasHero = useSelector((state) => state.gamification.selectedHero);
    const topEvents = useSelector((state) => state.home.eventsTop);
    
    const liveState = useSelector((state) => state.live.liveState);
    const manualRewards = useSelector((state) => state.gamification.manualRewards);
 

    const hasNewGames = filteredGames.newGames?.Data?.length > 0;
    const hasRecentGames = filteredGames.recentGames?.Data?.length > 0;
    
    const hasRewards = (manualRewards && ObjectHasValue(manualRewards)) ? true : false;
    //const hasBanners = (sportBanners && sportBanners.Banners) ? sportBanners.Banners.length > 0 : false;
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

        //if ((permissions.AllowToCasino || permissions.AllowToSlots) && isFavoritesVisible) dispatch(getCasinoFavs());
        //if (isBannersVisible) dispatch(getBanners());
        if (isTopEventsVisible) dispatch(getEventsTop());
        if (isRewardsVisible) dispatch(recRewards());

    }, [isTopEventsVisible, isFavoritesVisible, isRewardsVisible]);


    useEffect(() => {

        //if (isBannersVisible && hasBanners === false && sportBanners !== null) bannersRef.current.remove();
        if (isTopEventsVisible && hasTopEvents === false && topEvents !== null) topEventsRef.current.remove();
        if (isLiveEventsVisible && hasLiveEvents === false) liveEventsRef.current.remove();
        if (isRewardsVisible && hasRewards === false && manualRewards !== null) rewardsRef.current.remove();

    }, [hasTopEvents, hasLiveEvents,  hasRewards]);


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

                    {isBannersVisible &&
                        <div className={isMobile || (isTablet) ? [classes.BannersContent, classes.AdjustMargins].join(' ') : classes.BannersContent}>
                            <Banners />

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
                {(permissions.AllowToCasino || permissions.AllowToSlots) && 
                    <div ref={favoritesRef} style={{ minHeight: "164px" }}  >
                        {isFavoritesVisible && (
                            <CasinoFavorites />
                        )}
                    </div>
                }

                {/* REWARDS */}
                <div ref={rewardsRef} style={{ minHeight: "60px" }}>
                    {isRewardsVisible && user && hasRewards && (
                        <div className={classes.ManualRewards} onClick={() => addParamsToUrl('your-progress')}>
                            <ManualRewards />
                        </div>
                    )}
                </div>





                 
            </div>
        </div>
    );
};

export default Home;
