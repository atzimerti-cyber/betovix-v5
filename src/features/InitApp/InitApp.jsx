import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { useNavigate } from "react-router-dom";

import Preloader from "../UI/Loaders/Preloader";
import { getSite, getSiteSettings, loadInitData } from "./initAppAsyncActions";
import { getUser } from "../../pages/Login/loginAsyncActions";
import { affiliateCampaigns } from "../../pages/Login/loginAsyncActions";
import { isMoreThan14DaysOld } from "../../utils/custom";
import { storageGetTimezone, storageSetTimezone } from "../../utils/storage";

import { useTimezoneSelect, allTimezones } from "react-timezone-select";

import { appActions } from "./appSlice";
import { setLang, getLang } from "../../utils/storage";
import useBasePath from "../../hooks/useBasePath";
import { sportsHomeActions } from "../../pages/SportsBook/subpages/sportsHomeSlice";

const InitApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameNoParams = useBasePath();

  const lang = useSelector((state) => state.app.lang);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const initDataLoaded = useSelector((state) => state.app.initDataLoaded);
  const site = useSelector((state) => state.app.siteId);
  const siteSettingsSuccess = useSelector(
    (state) => state.app.siteSettingsSuccess
  );
  // const user = useSelector((state) => state.login.user);
  const userAccountId = useSelector((state) => state.login.user)?.AccountId;

  const timerIdRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const { parseTimezone } = useTimezoneSelect({
    labelStyle: "original",
    timezones: allTimezones,
  });

  const isValidTimezone = (obj) => {
    return (
      typeof obj === "object" &&
      obj !== null &&
      typeof obj.value === "string" &&
      typeof obj.label === "string" &&
      // /^\(GMT[+-]\d{1,2}:\d{2}/.test(obj.label) &&
      typeof obj.offset === "number" &&
      typeof obj.abbrev === "string" &&
      typeof obj.altName === "string"
    );
  };

  //Affiliate Code
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let value = searchParams.get("code");
    if (!value) {
      value = localStorage.getItem("AffiliateCode");
      const date = localStorage.getItem("AffiliateCodeDate");
      const isMore = isMoreThan14DaysOld(date);
      if (isMore) {
        localStorage.removeItem("AffilliateCode");
        localStorage.removeItem("AffilliateCodeDate");
      }
    }
    if (value) {
      localStorage.setItem("AffiliateCode", value);
      localStorage.setItem("AffiliateCodeDate", new Date().toISOString());

      dispatch(affiliateCampaigns(value));
    }
  }, []);

  //Lang in url
  useEffect(() => {
    if (Object.keys(lang).length > 0) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("lang", lang.id);

      const newPath = `${location.pathname}?${searchParams.toString()}`;

      if (newPath !== `${location.pathname}${location.search}`) {
        navigate(newPath, { replace: true });
      }
    }
    //Clear out open sports category and tournament
    if (
      !(pathnameNoParams === "/sportsbook" || pathnameNoParams === "/event")
    ) {
      dispatch(sportsHomeActions.setCategoryOpen(null));
      dispatch(sportsHomeActions.setTournamentOpen(null));
    }
  }, [location.pathname, location.search, lang.id, navigate]);

  //  1.Get site
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    dispatch(getSite(signal));
  }, []);

  // 2. Get site settings
  useEffect(() => {
    if (site) {
      setIsLoaded(true);
      const controller = new AbortController();
      dispatch(getSiteSettings(controller.signal));
    }
  }, [site]);

  useEffect(() => {
    if (siteSettingsSuccess) {
      dispatch(loadInitData(isMobile));

      // Set timezone
      let storedTimezone = storageGetTimezone();

      if (!storedTimezone || !isValidTimezone(storedTimezone)) {
        storedTimezone = parseTimezone(
          Intl.DateTimeFormat().resolvedOptions().timeZone
        );
        storageSetTimezone(storedTimezone);
      }
      dispatch(appActions.setTimezone(storedTimezone));
    }
  }, [siteSettingsSuccess]);

  useEffect(() => {
    if (!initDataLoaded) return;

    dispatch(loadInitData(isMobile));
  }, [userAccountId]);

  useEffect(() => {
    // Get user every 5 seconds...
    clearInterval(timerIdRef.current);
    const pollingCallback = () => {
      dispatch(getUser(navigate));
    };
    if (userAccountId) timerIdRef.current = setInterval(pollingCallback, 5000);

    return () => {
      if (!userAccountId) clearInterval(timerIdRef.current);
    };
  }, [userAccountId]);

  if (isLoaded && initDataLoaded) return <Outlet />;
  if (isLoaded) return <Preloader />;
  return null;
};

export default InitApp;
