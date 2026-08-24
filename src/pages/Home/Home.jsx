import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Home.module.css";
import useSlidesResponsive from "../../hooks/useSlidesResponsive";

import Banners from "../../features/Banners/Banners";
import LiveEvents from "./features/LiveEvents";
import TopEvents from "../../features/TopEvents/TopEvents";
import VipProgress from "./features/VipProgress";
import RegisterContainers from "./features/RegisterContainers";
import SelectHeroContainer from "./features/SelectHeroContainer";
import ManualRewards from "../UserGamification.jsx/features/ManualRewards";
import CasinoSections from "./features/CasinoSections";
import { getHomeCasinoSections } from "./homeAsyncActions";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isMobile, isTablet } = useSlidesResponsive();

  const user = useSelector((state) => state.login.user);
  const permissions = useSelector((state) => state.login.permissions) || {};
  const hasHero = useSelector((state) => state.gamification.selectedHero);
  const siteSettings = useSelector((state) => state.app.siteSettings) || {};

  const allowSports = permissions.AllowToSports === true;
  const allowCasino =
    permissions.AllowToCasino === true || permissions.AllowToSlots === true;
  const allowGamification = permissions.AllowGamification === true;
  const casinoOnlyHome = siteSettings?.HomeMode?.toLowerCase?.() === "casino";

  const [showTopEvents, setShowTopEvents] = useState(true);
  const [showManualRewards, setShowManualRewards] = useState(true);

  useEffect(() => {
    if (!allowCasino) return undefined;

    const controller = new AbortController();
    dispatch(getHomeCasinoSections(controller.signal));

    return () => controller.abort();
  }, [dispatch, allowCasino]);

  const addParamsToUrl = (modal, tab) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("modal", modal);
    if (tab) searchParams.set("tab", tab);

    navigate(`${location.pathname}?${searchParams.toString()}`, {
      replace: true,
    });
  };

  return (
    <div className={classes.PageContent} style={{ paddingTop: "16px" }}>
      <div className={classes.Home} id="homePage">
        {isMobile && hasHero && Object.keys(hasHero).length > 0 && (
          <div className={classes.VipContainer}>
            <VipProgress />
          </div>
        )}

        <div
          id="homeBanners"
          className={
            isMobile || isTablet
              ? [classes.BannersContent, classes.AdjustMargins].join(" ")
              : classes.BannersContent
          }
        >
          <Banners />

          {!isMobile && user && hasHero && (
            <div className={classes.VipContainer}>
              <VipProgress />
            </div>
          )}

          {!user && <RegisterContainers />}
          {!hasHero && user && allowGamification && <SelectHeroContainer />}
        </div>

        {allowGamification && user && showManualRewards && (
          <div
            className={classes.ManualRewards}
            onClick={() => addParamsToUrl("your-progress")}
          >
            <ManualRewards onDataNotFound={() => setShowManualRewards(false)} />
          </div>
        )}

        {!casinoOnlyHome && allowSports && (
          <>
            <LiveEvents />

            {showTopEvents && (
              <TopEvents onDataNotFound={() => setShowTopEvents(false)} />
            )}
          </>
        )}

        {allowCasino && <CasinoSections />}
      </div>
    </div>
  );
};

export default Home;
