import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

import { useNavigate } from "react-router-dom";

import Preloader from "../UI/Loaders/Preloader";
import { loadInitData } from "./initAppAsyncActions";
import { getUser } from "../../pages/Login/loginAsyncActions";
import { affiliateCampaigns } from "../../pages/Login/loginAsyncActions";
import { isMoreThan14DaysOld } from "../../utils/custom";

const InitApp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const initDataLoaded = useSelector((state) => state.app.initDataLoaded);
  // const user = useSelector((state) => state.login.user);
  const userAccountId = useSelector((state) => state.login.user)?.AccountId;

  const timerIdRef = useRef(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const basePath = window.location.origin;

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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Loads once on start
  useEffect(() => {
    dispatch(loadInitData(isMobile));
  }, []);

  // useEffect(() => {
  //   dispatch(tawktoChat());
  // }, []);

  // For loading initial data. Loads on change log in
  useEffect(() => {
    if (!initDataLoaded) return;

    dispatch(loadInitData(isMobile));
  }, [userAccountId]);

  // For setting timer for getting user. Loads on change log in
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

  //return initDataLoaded ? <Outlet /> : <Preloader />;
  if (isLoaded && initDataLoaded) return <Outlet />;
  if (isLoaded) return <Preloader />;
  return null;
};

export default InitApp;
