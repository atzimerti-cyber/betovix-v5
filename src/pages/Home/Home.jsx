import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import classes from "./Home.module.css";
import useSlidesResponsive from "../../hooks/useSlidesResponsive";

import Banners from "../../features/Banners/Banners";
import LiveEvents from "./features/LiveEvents";
import TopEvents from "../../features/TopEvents/TopEvents";
import RegisterContainers from "./features/RegisterContainers";
import CasinoSections from "./features/CasinoSections";
import { getHomeCasinoSections } from "./homeAsyncActions";

const Home = () => {
  const dispatch = useDispatch();
  const { isMobile, isTablet } = useSlidesResponsive();

  const user = useSelector((state) => state.login.user);
  const permissions = useSelector((state) => state.login.permissions) || {};
  const siteSettings = useSelector((state) => state.app.siteSettings) || {};

  const allowSports = permissions.AllowToSports === true;
  const allowCasino =
    permissions.AllowToCasino === true || permissions.AllowToSlots === true;
  const casinoOnlyHome = siteSettings?.HomeMode?.toLowerCase?.() === "casino";

  const [showTopEvents, setShowTopEvents] = useState(true);

  useEffect(() => {
    if (!allowCasino) return undefined;

    const controller = new AbortController();
    dispatch(getHomeCasinoSections(controller.signal));

    return () => controller.abort();
  }, [dispatch, allowCasino]);

  return (
    <div className={classes.PageContent} style={{ paddingTop: "16px" }}>
      <div className={classes.Home} id="homePage">

        <div
          id="homeBanners"
          className={
            isMobile || isTablet
              ? [classes.BannersContent, classes.AdjustMargins].join(" ")
              : classes.BannersContent
          }
        >
          <Banners />

          {!user && <RegisterContainers />}
        </div>

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
