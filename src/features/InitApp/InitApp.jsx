import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
// import { useInactivityTimer } from "../../utils/useInactivityTimer";

import { useNavigate } from "react-router-dom";

import Preloader from "../UI/Loaders/Preloader";
import { getSite, getSiteSettings, loadInitData } from "./initAppAsyncActions";
import { getUser, refreshAuthToken } from "../../pages/Login/loginAsyncActions";
import { affiliateCampaigns } from "../../pages/Login/loginAsyncActions";
import { isMoreThan14DaysOld } from "../../utils/custom";
import { storageGetTimezone, storageSetTimezone } from "../../utils/storage";

import { useTimezoneSelect, allTimezones } from "react-timezone-select";

import appSlice, { appActions } from "./appSlice";
import useBasePath from "../../hooks/useBasePath";
import { sportsHomeActions } from "../../pages/SportsBook/subpages/sportsHomeSlice";
import { mod } from "@tensorflow/tfjs";
import { getAccessToken, setAccessToken, setAuthStorageMode, startTokenRefreshTimer } from "../../utils/auth";
import { jwtDecode } from "jwt-decode";

const InitApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const pathnameNoParams = useBasePath();
  const prevPathnameRef = useRef(`${location.pathname}${location.search}`);

  // useInactivityTimer(() => {
  //   window.location.reload();
  // }, 1200000);

  const lang = useSelector((state) => state.app.lang);
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const initDataLoaded = useSelector((state) => state.app.initDataLoaded);
  const site = useSelector((state) => state.app.siteId);
  const siteSettingsSuccess = useSelector(
    (state) => state.app.siteSettingsSuccess
  );
  const siteSettings = useSelector((state) => state.app.siteSettings);
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

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");

    if (token && !initDataLoaded) {
      setAccessToken(token);
      searchParams.delete("token");

      // Replace URL without token parameter
      navigate(
        {
          pathname: location.pathname,
          search: searchParams.toString(),
        },
        { replace: true }
      );
    }
  }, [initDataLoaded, location, navigate, setAccessToken]);

  //Affiliate Code
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let value = searchParams.get("code");
    let modal = searchParams.get("modal");
    if (modal === "promo-code") return;
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

  //Lang in url and sports accordion control
  useEffect(() => {
    if (Object.keys(lang).length > 0) {
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("lang", lang.id);

      const newPath = `${location.pathname}?${searchParams.toString()}`;

      if (newPath !== `${location.pathname}${location.search}`) {
        navigate(newPath, { replace: true });
      }
    }
  }, [location.pathname, lang.id]);

  //previous path state
  useEffect(() => {
    const removeLangParam = (url) => {
      const urlObj = new URL(window.location.origin + url);
      urlObj.searchParams.delete("lang");
      urlObj.searchParams.delete("modal");
      urlObj.searchParams.delete("tab");
      urlObj.searchParams.delete("isBonus");
      return urlObj.pathname + urlObj.search;
    };

    const previousUrl = prevPathnameRef.current
      ? removeLangParam(prevPathnameRef.current)
      : null;
    const currentUrl = removeLangParam(
      `${location.pathname}${location.search}`
    );

    if (previousUrl !== currentUrl) {
      dispatch(appActions.setPrevPage(prevPathnameRef.current));
      prevPathnameRef.current = `${location.pathname}${location.search}`;
      // prevPathnameRef.current = currentUrl;
    }
  }, [location.pathname, location.search]);

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
    if (!siteSettings) return;
    setAuthStorageMode(siteSettings?.Mode?.toLowerCase() === "shop");
  }, [siteSettings]);

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
    // Refresh user state every 60 seconds...
    clearInterval(timerIdRef.current);
    const pollingCallback = () => {
      dispatch(getUser(navigate));
    };
    if (userAccountId) timerIdRef.current = setInterval(pollingCallback, 60000);

    return () => {
      clearInterval(timerIdRef.current);
    };
  }, [userAccountId]);


  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") return;

      const token = getAccessToken();
      if (!token) return;

      try {
        const decoded = jwtDecode(token);
        const remaining = decoded.exp - Date.now() / 1000;

        if (remaining <= 10) dispatch(refreshAuthToken());
        else startTokenRefreshTimer(remaining, dispatch);
      } catch {
        dispatch(refreshAuthToken());
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [dispatch]);

  if (isLoaded && initDataLoaded) return <Outlet />;
  if (isLoaded) return <Preloader />;
  return null;
};

export default InitApp;
