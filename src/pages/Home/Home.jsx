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
import CasinoTagSwiper from "../../features/CasinoTag/CasinoTagSwiper";
import GamificationBanner from "../UserGamification.jsx/GamificationBanner/GamificationBanner";
import ServiceLinksSwiper from "../../features/UI/MainSwiper/ServiceLinksSwiper";
import MainLinksSwiper from "../../features/UI/MainSwiper/MainLinksSwiper";
import GameLinksSwiper from "../../features/UI/MainSwiper/GameLinksSwiper";

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

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

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
      <div className={classes.Home} id="homePage">
        {isMobile && hasHero && Object.keys(hasHero).length > 0 && (
          <div className={classes.VipContainer} key={999}>
            <VipProgress />
          </div>
        )}

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
                        key={index}
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
                        key={index}
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
                        key={index}
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
                        key={index}
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
                        key={index}
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
                      key={index}
                      style={{ minHeight: "60px" }}
                      ref={elementRef}
                    >
                      <div
                        id="homeBanners"
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
                      key={index}
                      style={{ minHeight: "40px" }}
                      ref={elementRef}
                    >
                      <Crypto
                        onDataNotFound={() => handleRemoveComponent(index)}
                      />
                    </div>
                  )}

                  {tag.Category === "7" && (
                    <>
                      {tag.Tags === "ServiceLinks" && (
                        <ServiceLinksSwiper
                          onDataNotFound={() => handleRemoveComponent(index)}
                        />
                      )}

                      {tag.Tags === "MainLinks" && (
                        <MainLinksSwiper
                          onDataNotFound={() => handleRemoveComponent(index)}
                        />
                      )}

                      {tag.Tags.includes("Game") && (
                        <GameLinksSwiper
                          tag={tag.Tags}
                          onDataNotFound={() => handleRemoveComponent(index)}
                        />
                      )}
                    </>
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
