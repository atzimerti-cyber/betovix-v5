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
import CrashGames from '../../features/CrashGames/CrashGames';
import RecommendedGames from '../../features/RecommendedGames/RecommendedGames';
import GamificationBanner from '../UserGamification.jsx/GamificationBanner/GamificationBanner';

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

    const { slidesPerView, slidesPerGroup, isMobile, isTablet, isDesktop, isBigDesktop } = useSlidesResponsive();

    const user = useSelector((state) => state.login.user);
    const permissions = useSelector((state) => state.login.permissions);
    const hasHero = useSelector((state) => state.gamification.selectedHero);
    const liveState = useSelector((state) => state.live.liveState);

    const hasLiveEvents = ObjectHasValue(liveState);

    const { isVisible: isCryptoVisible, elementRef: cryptoRef } = useIntersectionObserver(0.3, user);
    const { isVisible: isBannersVisible, elementRef: bannersRef } = useIntersectionObserver(0.3, user);
    const { isVisible: isLiveEventsVisible, elementRef: liveEventsRef } = useIntersectionObserver(0.3, user);
    const { isVisible: isTopEventsVisible, elementRef: topEventsRef } = useIntersectionObserver(0.3, user);
    const { isVisible: isFavoritesVisible, elementRef: favoritesRef } = useIntersectionObserver(0.3, user);
    const { isVisible: isRewardsVisible, elementRef: rewardsRef } = useIntersectionObserver(0.3, user);
    const { isVisible: isCrashGamesVisible, elementRef: crashGamesRef } = useIntersectionObserver();
    const { isVisible: isRecommendedGamesVisible, elementRef: recommendedGamesRef } = useIntersectionObserver();
    const { isVisible: isHeroBannersVisible, elementRef: heroBannersRef } = useIntersectionObserver();

    const addParamsToUrl = (modal, tab) => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('modal', modal);
        if (tab) searchParams.set('tab', tab);

        navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
    };

    // REMOVE COMPONENTS IF NO DATA EXISTS
    const [showCrypto, setShowCrypto] = useState(true);
    const handleRemoveCryptoComponent = () => { setShowCrypto(false); };
    const [showBanners, setShowBanners] = useState(true);
    const handleRemoveBannersComponent = () => { setShowBanners(false); };
    const [showFavorites, setShowFavorites] = useState(true);
    const handleRemoveFavoritesComponent = () => { setShowFavorites(false); };
    const [showTopEvents, setShowTopEvents] = useState(true);
    const handleRemoveTopEventsComponent = () => { setShowTopEvents(false); };
    const [showRewards, setShowRewards] = useState(true);
    const handleRemoveRewardsComponent = () => { setShowRewards(false); };
    const [showHeroBanner, setShowHeroBanner] = useState(true);
    const handleRemoveHeroBannerComponent = () => { setShowHeroBanner(false); };
    const [showCrashGames, setShowCrashGames] = useState(true);
    const handleRemoveCrashGamesComponent = () => { setShowCrashGames(false); };
    const [showRecommendedGames, setShowRecommendedGames] = useState(true);
    const handleRemoveRecommendedGamesComponent = () => { setShowRecommendedGames(false); };

    return (
        <div className={classes.PageContent} style={{ paddingTop: '16px', }} >
            <div className={classes.Home}>

                {/*PROGRESS IN MOBILE */}
                {isMobile && hasHero && Object.keys(hasHero).length > 0 &&
                    <div className={classes.VipContainer}>
                        <VipProgress />
                    </div>
                }

                {/* BANNERS */}
                {showBanners && <div ref={bannersRef} style={{ minHeight: "60px", }} >
                    {isBannersVisible &&
                        <div className={isMobile || (isTablet) ? [classes.BannersContent, classes.AdjustMargins].join(' ') : classes.BannersContent}>

                            <Banners onDataNotFound={handleRemoveBannersComponent} />

                            {/*PROGRESS IN DESKTOP */}
                            {!isMobile && user && hasHero && (
                                <div className={classes.VipContainer}>
                                    <VipProgress />
                                </div>
                            )}

                            {!user && <RegisterContainers />}

                        </div>
                    }
                </div>}

                {/* HEROES BANNER */}
                {(!user || !hasHero) && showHeroBanner &&
                    <div style={{ minHeight: "300px" }} ref={heroBannersRef}>
                        {isHeroBannersVisible &&
                            <GamificationBanner onDataNotFound={handleRemoveHeroBannerComponent} />
                        }
                    </div>
                }

                {/* CRYPTO */}
                {user && showCrypto &&
                    <div style={{ minHeight: "55px" }} ref={cryptoRef}>
                        {isCryptoVisible &&
                            <Crypto onDataNotFound={handleRemoveCryptoComponent} />
                        }
                    </div>
                }

                {/* LIVE EVENTS */}
                {permissions.AllowToSports && (
                    <div ref={liveEventsRef} style={{ minHeight: "160px" }} >
                        {isLiveEventsVisible && hasLiveEvents &&
                            <LiveEvents />
                        }
                    </div >
                )}

                {/* RECOMMENDED GAMES */}
                {showRecommendedGames && (permissions.AllowToCasino || permissions.AllowToSlots) &&
                    <div ref={recommendedGamesRef} style={{ minHeight: "180px" }} >
                        {isRecommendedGamesVisible && (
                            <RecommendedGames onDataNotFound={handleRemoveRecommendedGamesComponent} />
                        )}
                    </div>
                }

                {/* TOP EVENTS */}
                {showTopEvents && permissions.AllowToSports &&
                    (
                        <div ref={topEventsRef} style={{ minHeight: "160px" }}>
                            {isTopEventsVisible &&
                                <TopEvents onDataNotFound={handleRemoveTopEventsComponent} />
                            }
                        </div>
                    )
                }

                {/* CRASH GAMES */}
                {showCrashGames && (permissions.AllowToCasino || permissions.AllowToSlots) &&
                    <div ref={crashGamesRef} style={{ minHeight: "180px" }}  >
                        {isCrashGamesVisible && (
                            <CrashGames onDataNotFound={handleRemoveCrashGamesComponent} />
                        )}
                    </div>
                }

                {/* FAVORITES */}
                {showFavorites && user && (permissions.AllowToCasino || permissions.AllowToSlots) &&
                    <div ref={favoritesRef} style={{ minHeight: "180px" }}  >
                        {isFavoritesVisible && (
                            <CasinoFavorites onDataNotFound={handleRemoveFavoritesComponent} />
                        )}
                    </div>
                }

                {/* REWARDS */}
                {showRewards && user && <div ref={rewardsRef} style={{ minHeight: "60px", marginTop: "5px" }}>
                    {isRewardsVisible && (
                        <div className={classes.ManualRewards} onClick={() => addParamsToUrl('your-progress')}>
                            <ManualRewards onDataNotFound={handleRemoveRewardsComponent} />
                        </div>
                    )}
                </div>}

            </div>
        </div>
    );
};

export default Home;
