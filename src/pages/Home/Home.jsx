import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 

import classes from './Home.module.css';

import useIntersectionObserver from '../../hooks/IntersectionObserver';
import useSlidesResponsive from '../../hooks/useSlidesResponsive';
 
import Banners from '../../features/Banners/Banners';
import LiveEvents from './features/LiveEvents';
import TopEvents from '../../features/TopEvents/TopEvents';
import VipProgress from './features/VipProgress';
import RegisterContainers from './features/RegisterContainers';
import Crypto from '../../features/CryptoPriceSwiper/Crypto';
import ManualRewards from '../UserGamification.jsx/features/ManualRewards';
import CasinoFavorites from '../../features/CasinoFavorites/CasinoFavorites'; 

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

    const [axiosSignal, setAxiosSignal] = useState(null);
    const {slidesPerView,slidesPerGroup,isMobile,isTablet,isDesktop,isBigDesktop} =useSlidesResponsive();

    const filteredGames = useSelector((state) => state.casino.filteredGames);
    const user = useSelector((state) => state.login.user);
    const permissions = useSelector((state) => state.login.permissions);
    const hasHero = useSelector((state) => state.gamification.selectedHero);
    const liveState = useSelector((state) => state.live.liveState); 
    
    const hasLiveEvents = ObjectHasValue(liveState);

    const { isVisible: isBannersVisible, elementRef: bannersRef } = useIntersectionObserver();
    const { isVisible: isLiveEventsVisible, elementRef: liveEventsRef } = useIntersectionObserver();
    const { isVisible: isTopEventsVisible, elementRef: topEventsRef } = useIntersectionObserver();
    const { isVisible: isFavoritesVisible, elementRef: favoritesRef } = useIntersectionObserver();
    const { isVisible: isRewardsVisible, elementRef: rewardsRef } = useIntersectionObserver();

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
                        {isTopEventsVisible && 
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
                    {isRewardsVisible && user &&   (
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
