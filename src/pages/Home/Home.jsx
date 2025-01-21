import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Home.module.css";

import useIntersectionObserver from "../../hooks/IntersectionObserver";
import useSlidesResponsive from "../../hooks/useSlidesResponsive";

import Banners from "../../features/Banners/Banners";
import LiveEvents from "./features/LiveEvents";
import TopEvents from "../../features/TopEvents/TopEvents";
import VipProgress from "./features/VipProgress";
import RegisterContainers from "./features/RegisterContainers";
import SelectHeroContainer from "./features/SelectHeroContainer";
import Crypto from "../../features/CryptoPriceSwiper/Crypto";
import ManualRewards from "../UserGamification.jsx/features/ManualRewards";
import CasinoFavorites from "../../features/CasinoFavorites/CasinoFavorites";
import CrashGames from "../../features/CrashGames/CrashGames";
import CasinoTagSwiper from "../../features/CasinoTag/CasinoTagSwiper";
import RecommendedGames from "../../features/RecommendedGames/RecommendedGames";
import GamificationBanner from "../UserGamification.jsx/GamificationBanner/GamificationBanner";

function ObjectHasValue(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
}

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const lang = useSelector((state) => state.app.lang); // Necessary for rerendering translations
  const tags = useSelector((state) => state.app.homeTags);

  const { isMobile, isTablet } = useSlidesResponsive();

  const user = useSelector((state) => state.login.user);
  const permissions = useSelector((state) => state.login.permissions);
  const hasHero = useSelector((state) => state.gamification.selectedHero);
  const liveState = useSelector((state) => state.live.liveState);

  const hasLiveEvents = ObjectHasValue(liveState);

  const [tagVisibility, setTagVisibility] = useState(
    tags && tags.map(() => true) // Initializing all components to visible (true)
  );

  // const { isVisible: isCryptoVisible, elementRef: cryptoRef } =
  //   useIntersectionObserver(0.3, user);
  // const { isVisible: isBannersVisible, elementRef: bannersRef } =
  //   useIntersectionObserver(0.3, user);
  // const { isVisible: isLiveEventsVisible, elementRef: liveEventsRef } =
  //   useIntersectionObserver(0.3, user);
  // const { isVisible: isTopEventsVisible, elementRef: topEventsRef } =
  //   useIntersectionObserver(0.3, user);
  // const { isVisible: isFavoritesVisible, elementRef: favoritesRef } =
  //   useIntersectionObserver(0.3, user);
  // const { isVisible: isRewardsVisible, elementRef: rewardsRef } =
  //   useIntersectionObserver(0.3, user);
  // const { isVisible: isCrashGamesVisible, elementRef: crashGamesRef } =
  //   useIntersectionObserver();
  // const { isVisible: isGameShowsVisible, elementRef: gameShowsRef } =
  //   useIntersectionObserver();
  // const { isVisible: isPragmaticVisible, elementRef: pragmaticRef } =
  //   useIntersectionObserver();
  // const { isVisible: isNoLimitVisible, elementRef: noLimitRef } =
  //   useIntersectionObserver();
  // const {
  //   isVisible: isRecommendedGamesVisible,
  //   elementRef: recommendedGamesRef,
  // } = useIntersectionObserver();
  // const { isVisible: isHeroBannersVisible, elementRef: heroBannersRef } =
  //   useIntersectionObserver();

  // const { isVisible: isTagComponentVisible, elementRef: tagComponentRef } =
  //   useIntersectionObserver(0.3, user);

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  // REMOVE COMPONENTS IF NO DATA EXISTS
  // const [showCrypto, setShowCrypto] = useState(true);
  // const handleRemoveCryptoComponent = () => {
  //   setShowCrypto(false);
  // };
  // const [showBanners, setShowBanners] = useState(true);
  // const handleRemoveBannersComponent = () => {
  //   setShowBanners(false);
  // };
  // const [showFavorites, setShowFavorites] = useState(true);
  // const handleRemoveFavoritesComponent = () => {
  //   setShowFavorites(false);
  // };
  // const [showTopEvents, setShowTopEvents] = useState(true);
  // const handleRemoveTopEventsComponent = () => {
  //   setShowTopEvents(false);
  // };
  // const [showRewards, setShowRewards] = useState(true);
  // const handleRemoveRewardsComponent = () => {
  //   setShowRewards(false);
  // };
  // const [showHeroBanner, setShowHeroBanner] = useState(true);
  // const handleRemoveHeroBannerComponent = () => {
  //   setShowHeroBanner(false);
  // };
  // const [showCrashGames, setShowCrashGames] = useState(true);
  // const handleRemoveCrashGamesComponent = () => {
  //   setShowCrashGames(false);
  // };
  // const [showRecommendedGames, setShowRecommendedGames] = useState(true);
  // const handleRemoveRecommendedGamesComponent = () => {
  //   setShowRecommendedGames(false);
  // };

  // const [showGameShows, setShowGameShows] = useState(true);
  // const handleRemoveGameShowsComponent = () => {
  //   setShowGameShows(false);
  // };
  // const [showPragmatic, setShowPragmatic] = useState(true);
  // const handleRemovePragmaticComponent = () => {
  //   setShowPragmatic(false);
  // };
  // const [showNoLimit, setShowNoLimit] = useState(true);
  // const handleRemoveNoLimitComponent = () => {
  //   setShowNoLimit(false);
  // };

  // Handle the removal of the tag component
  const handleRemoveComponent = (index) => {
    console.log(`Removing tag component at index: ${index}`);

    // Set the specific tag component at `index` to false
    setTagVisibility((prevVisibility) => {
      const newVisibility = [...prevVisibility];
      newVisibility[index] = false; // Set visibility of the component at index to false
      return newVisibility;
    });
  };

  return (
    <div className={classes.PageContent} style={{ paddingTop: "16px" }}>
      <div className={classes.Home}>
        {isMobile && hasHero && Object.keys(hasHero).length > 0 && (
          <div className={classes.VipContainer} key={1}>
            <VipProgress />
          </div>
        )}

        {/* {showBanners && (
          <div ref={bannersRef} style={{ minHeight: "60px" }}>
            {isBannersVisible && (
              <div
                className={
                  isMobile || isTablet
                    ? [classes.BannersContent, classes.AdjustMargins].join(" ")
                    : classes.BannersContent
                }
              >
                <Banners onDataNotFound={handleRemoveBannersComponent} />

                {!isMobile && user && hasHero && (
                  <div className={classes.VipContainer}>
                    <VipProgress />
                  </div>
                )}

                {!user && <RegisterContainers />}
                {!hasHero && user && permissions.AllowGamification && (
                  <SelectHeroContainer />
                )}
              </div>
            )}
          </div>
        )}
        {(!user || !hasHero) &&
          showHeroBanner &&
          permissions.AllowGamification && (
            <div style={{ minHeight: "300px" }} ref={heroBannersRef}>
              {isHeroBannersVisible && (
                <GamificationBanner
                  onDataNotFound={handleRemoveHeroBannerComponent}
                />
              )}
            </div>
          )}

        {showCrypto && (
          <div style={{ minHeight: "55px" }} ref={cryptoRef}>
            {isCryptoVisible && (
              <Crypto onDataNotFound={handleRemoveCryptoComponent} />
            )}
          </div>
        )}

        {permissions.AllowToSports && (
          <div ref={liveEventsRef} style={{ minHeight: "160px" }}>
            {isLiveEventsVisible && hasLiveEvents && <LiveEvents />}
          </div>
        )}

        {showRecommendedGames &&
          (permissions.AllowToCasino || permissions.AllowToSlots) && (
            <div ref={recommendedGamesRef} style={{ minHeight: "180px" }}>
              {isRecommendedGamesVisible && (
                <RecommendedGames
                  onDataNotFound={handleRemoveRecommendedGamesComponent}
                />
              )}
            </div>
          )}

        {showTopEvents && permissions.AllowToSports && (
          <div ref={topEventsRef} style={{ minHeight: "160px" }}>
            {isTopEventsVisible && (
              <TopEvents onDataNotFound={handleRemoveTopEventsComponent} />
            )}
          </div>
        )}

        {showGameShows &&
          (permissions.AllowToCasino || permissions.AllowToSlots) && (
            <div ref={gameShowsRef} style={{ minHeight: "180px" }}>
              {isGameShowsVisible && (
                <CasinoTagSwiper
                  title="Game Shows"
                  tag="show"
                  onDataNotFound={handleRemoveGameShowsComponent}
                />
              )}
            </div>
          )}
        {showPragmatic &&
          (permissions.AllowToCasino || permissions.AllowToSlots) && (
            <div ref={pragmaticRef} style={{ minHeight: "180px" }}>
              {isPragmaticVisible && (
                <CasinoTagSwiper
                  title="Pragmatic"
                  tag="pragmatic"
                  onDataNotFound={handleRemovePragmaticComponent}
                />
              )}
            </div>
          )}
        {showNoLimit &&
          (permissions.AllowToCasino || permissions.AllowToSlots) && (
            <div ref={noLimitRef} style={{ minHeight: "180px" }}>
              {isNoLimitVisible && (
                <CasinoTagSwiper
                  title="No Limit"
                  tag="NoLimit"
                  onDataNotFound={handleRemoveNoLimitComponent}
                />
              )}
            </div>
          )}

        {showCrashGames &&
          (permissions.AllowToCasino || permissions.AllowToSlots) && (
            <div ref={crashGamesRef} style={{ minHeight: "180px" }}>
              {isCrashGamesVisible && (
                <CrashGames onDataNotFound={handleRemoveCrashGamesComponent} />
              )}
            </div>
          )}

        {showFavorites &&
          user &&
          (permissions.AllowToCasino || permissions.AllowToSlots) && (
            <div ref={favoritesRef} style={{ minHeight: "180px" }}>
              {isFavoritesVisible && (
                <CasinoFavorites
                  onDataNotFound={handleRemoveFavoritesComponent}
                />
              )}
            </div>
          )}

        {showRewards && user && permissions.AllowGamification && (
          <div ref={rewardsRef} style={{ minHeight: "60px", marginTop: "5px" }}>
            {isRewardsVisible && (
              <div
                className={classes.ManualRewards}
                onClick={() => addParamsToUrl("your-progress")}
              >
                <ManualRewards onDataNotFound={handleRemoveRewardsComponent} />
              </div>
            )}
          </div>
        )} */}

        {/* TAGS TEST */}
        {tags &&
          tags.map((tag, index) => {
            const { isVisible, elementRef } = useIntersectionObserver(
              0.3,
              user
            );

            return (
              tagVisibility[index] && (
                <>
                  {(tag.Category === "1" ||
                    tag.Category === "2" ||
                    tag.Category === "3") &&
                    permissions.AllowToCasino && (
                      <div
                        key={tag.Tags}
                        style={{ minHeight: "180px" }}
                        ref={elementRef}
                      >
                        {isVisible && (
                          <CasinoTagSwiper
                            title={tag.Name}
                            tag={tag.Tags}
                            onDataNotFound={() => handleRemoveComponent(index)}
                          />
                        )}
                      </div>
                    )}

                  {tag.Category === "4" &&
                    permissions.AllowToSports &&
                    tag.Name === "Live Events" &&
                    hasLiveEvents && (
                      <div
                        key={tag.Tags}
                        style={{ minHeight: "180px" }}
                        ref={elementRef}
                      >
                        <LiveEvents />
                      </div>
                    )}

                  {tag.Category === "4" &&
                    permissions.AllowToSports &&
                    tag.Name === "Top Events" && (
                      <div
                        key={tag.Tags}
                        style={{ minHeight: "180px" }}
                        ref={elementRef}
                      >
                        <TopEvents
                          onDataNotFound={() => handleRemoveComponent(index)}
                        />
                      </div>
                    )}

                  {tag.Category === "5" &&
                    tag.Name === "Hero Banenrs" &&
                    permissions.AllowGamification &&
                    (!user || !hasHero) && (
                      <div
                        key={tag.Tags}
                        style={{ minHeight: "180px" }}
                        ref={elementRef}
                      >
                        <GamificationBanner
                          onDataNotFound={() => handleRemoveComponent(index)}
                        />
                      </div>
                    )}

                  {tag.Category === "5" &&
                    tag.Name === "Rewards" &&
                    permissions.AllowGamification &&
                    user && (
                      <div
                        key={tag.Tags}
                        style={{ minHeight: "180px" }}
                        ref={elementRef}
                      >
                        <div
                          className={classes.ManualRewards}
                          onClick={() => addParamsToUrl("your-progress")}
                        >
                          <ManualRewards
                            onDataNotFound={() => handleRemoveComponent(index)}
                          />
                        </div>
                      </div>
                    )}

                  {tag.Category === "6" && tag.Name === "Banners" && (
                    <div
                      key={tag.Tags}
                      style={{ minHeight: "60px" }}
                      ref={elementRef}
                    >
                      <div
                        className={
                          isMobile || isTablet
                            ? [
                                classes.BannersContent,
                                classes.AdjustMargins,
                              ].join(" ")
                            : classes.BannersContent
                        }
                      >
                        <Banners
                          onDataNotFound={() => handleRemoveComponent(index)}
                        />

                        {/* PROGRESS IN DESKTOP */}
                        {!isMobile && user && hasHero && (
                          <div className={classes.VipContainer}>
                            <VipProgress />
                          </div>
                        )}

                        {!user && <RegisterContainers />}
                        {!hasHero && user && permissions.AllowGamification && (
                          <SelectHeroContainer />
                        )}
                      </div>
                    </div>
                  )}

                  {tag.Category === "6" && tag.Name === "Crypto Prices" && (
                    <div
                      key={tag.Tags}
                      style={{ minHeight: "40px" }}
                      ref={elementRef}
                    >
                      <Crypto
                        onDataNotFound={() => handleRemoveComponent(index)}
                      />
                    </div>
                  )}
                </>
              )
            );
          })}
      </div>
    </div>
  );
};

export default Home;
