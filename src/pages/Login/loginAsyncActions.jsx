import axiosApi from "../../axios-api";

import { loginActions } from "./loginSlice";
import { layoutActions } from "../../../src/features/Layout/layoutSlice";
import { gamificationActions } from "../UserGamification.jsx/userGamificationSlice";
import { getLang } from "../../utils/storage";

import { toast } from "react-toastify";
import { setAccessToken } from "../../utils/auth";
import config from "../../config";

export const logingGoogle = (loginInfo, navigate, locationPathname) => {
  return async (dispatch) => {
    console.log(" dispatch(loginActions.setLoginLoading(true));");
    dispatch(loginActions.setLoginLoading(true));

    try {
      const response = await axiosApi.post(
        `login/AuthenticateGoogle?siteId=${config.VITE_SITE_ID}`,
        loginInfo,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );
      if (response.data.Status.StatusCode !== 200)
        throw Error(response.data.Contents);
      setAccessToken(response.data.Contents.Token);

      const response2 = await axiosApi.get(
        `login/State/?lang=en&siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );
      if (response2.data.Status.StatusCode !== 200)
        throw Error(response2.data.Contents);

      // TODO: The rest should come from the backend
      const user = {
        ...response2.data.Contents,

        // profileHidden: false,
        // marketingEmails: true,
        // level: 0,
        // wagered: 500,
        // registered: 1712505696754,
      };

      dispatch(loginActions.setUser(user));

      dispatch(loginActions.setLoginLoading(false));
      navigate(locationPathname, { replace: true });
    } catch (error) {
      toast.error(error?.message);
      dispatch(loginActions.setLoginLoading(false));
    }
  };
};
export const login = (loginInfo, navigate, locationPathname) => {
  return async (dispatch) => {
    dispatch(loginActions.setLoginLoading(true));

    try {
      const response = await axiosApi.post(
        `login/Authenticate2?siteId=${config.VITE_SITE_ID}`,
        loginInfo,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );
      if (response.data.Status.StatusCode !== 200)
        throw Error(response.data.Contents);
      setAccessToken(response.data.Contents.Token);

      const response2 = await axiosApi.get(
        `login/State/?lang=en&siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );
      if (response2.data.Status.StatusCode !== 200)
        throw Error(response2.data.Contents);

      // TODO: The rest should come from the backend
      const user = {
        ...response2.data.Contents,

        // profileHidden: false,
        // marketingEmails: true,
        // level: 0,
        // wagered: 500,
        // registered: 1712505696754,
      };

      dispatch(loginActions.setUser(user));

      dispatch(loginActions.setLoginLoading(false));
      navigate(locationPathname, { replace: true });
    } catch (error) {
      toast.error(error?.message);
      dispatch(loginActions.setLoginLoading(false));
    }
  };
};

export const register = (registerInfo, navigate, locationPathname) => {
  return async (dispatch) => {
    dispatch(loginActions.setLoginLoading(true));

    try {
      let response2;
      const response1 = await axiosApi.get(
        `/MyAccount/UsernameExists?username=${registerInfo.displayName}&lang=en&siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );
      setTimeout(() => {
        dispatch(loginActions.setLoginLoading(false));
        // navigate(`${locationPathname}?modal=auth&tab=login`, { replace: true });

        // toast.success('Wow so easy!');
      }, 1000);
      if (response1.data.Contents == true) {
        toast.error("Username already exists.");
      } else if (response1.data.Contents == false) {
        response2 = await axiosApi.post(
          `MyAccount/Register/?lang=en&siteid=${config.VITE_SITE_ID}`,
          {
            Code: registerInfo.code,
            Email: registerInfo.email,
            Password: registerInfo.password,
            Country: registerInfo.country,
            SiteId: config.VITE_SITE_ID,
            Username: registerInfo.displayName,
          },
          {
            baseURLOverride: config.VITE_WALLET_API_BASE,
          }
        );
        if (response2.data.Status.StatusCode !== 200) {
          toast.error(response2.data.Contents);
        } else {
          // toast.success(response2.data.Contents);
          toast.success(
            "Success! Please check your email to verify your registration."
          );
          navigate(`${locationPathname}?modal=auth&tab=login`, {
            replace: true,
          });
        }

        console.log(response2);
      }
    } catch (error) {
      dispatch(loginActions.setLoginLoading(false));
      toast.error("An error has occurred!");
    }
  };
};

export const verify = (code, navigate) => {
  return async (dispatch) => {
    try {
      const response = await axiosApi.get(
        `/MyAccount/VerifyAccount?activationCode=${code}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );
      if (response.data.Status.StatusCode === 200) {
        toast.success(response.data.Contents);
        navigate(`?modal=auth&tab=login`, { replace: true });
      } else {
        toast.error(response.data.Contents);
        navigate(``, { replace: true });
        dispatch(loginActions.setLoginLoading(false));
      }
    } catch (error) {
      toast.error("An error has occurred!");
    }
  };
};

export const affiliateCampaigns = (code) => {
  return async (dispatch) => {
    try {
      const response = await axiosApi.get(
        `/AffiliateCampaigns/CampaignClick?code=${code}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );
    } catch (error) {
      toast.error("An error has occurred!");
    }
  };
};

export const getUser = (navigate) => {
  return async (dispatch, getState) => {
    try {
      const response = await axiosApi.get(
        `login/State/?lang=en&siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
          // baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );
      if (response.data.Status.StatusCode !== 200)
        dispatch(loginActions.logout());
      else {
        // TODO: The rest should come from the backend
        const user = {
          ...response.data.Contents,
          // profileHidden: false,
          // marketingEmails: true,
          // level: 0,
          // wagered: 500,
          // registered: 1712505696754,
        };

        //REWARDS
        let rewards = [];
        const params = new URLSearchParams(window.location.search);
        const isModalAchievementOpen = params.get("modal") === "achievement";

        if (
          !isModalAchievementOpen &&
          response.data.Contents.Rewards &&
          response.data.Contents.Rewards.length > 0
        ) {
          rewards = response.data.Contents.Rewards;
          dispatch(gamificationActions.setPopupRewards(rewards));
          //console.log(rewards);
          const params = new URLSearchParams(location.search);
          params.set("modal", "achievement");
          navigate(`${location.pathname}?modal=achievement`, {
            replace: false,
          });

          const currentState = getState().gamification;

          const rew = currentState.availableRewards;
          const newRew = rew + response.data.Contents.Rewards.length;

          dispatch(gamificationActions.setAvailableRewards(newRew));
        }

        dispatch(loginActions.setUser(user));
        dispatch(layoutActions.setAvailableBonus(user));
        dispatch(layoutActions.setAvailableBonusBalance(user));
      }
    } catch (error) {
      null;
      //toast.error(error?.message);
    }
  };
};

export const sentRecoveryUsername = (username) => {
  return async (dispatch, getState) => {
    dispatch(loginActions.setUpdateLoading(true));
    const lang = getLang();
    try {
      const response = await axiosApi.get(
        `/MyAccount/RecoverPassword?username=${username}&lang=${lang.id}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );
      setTimeout(() => {
        dispatch(loginActions.setUpdateLoading(false));
      }, 1000);

      if (response.data.Status.StatusCode === 200) {
        toast.success(response.data.Contents);
        dispatch(loginActions.setUsernameSentCorrectly(true));
      } else {
        toast.error("Please ensure your username is correct");
        dispatch(loginActions.setUsernameSentCorrectly(false));
      }
    } catch (error) {
      toast.error("An error has occurred!");
      dispatch(loginActions.setUsernameSentCorrectly(false));
      dispatch(loginActions.setUpdateLoading(false));
    }
  };
};

export const verifyCode = (code) => {
  return async (dispatch) => {
    dispatch(loginActions.setUpdateLoading(true));

    try {
      const response = await axiosApi.get(
        `/MyAccount/VerifyRecovery?RecoveryCode=${code}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      setTimeout(() => {
        dispatch(loginActions.setUpdateLoading(false));
      }, 1000);

      if (response.data.Status.StatusCode === 200) {
        toast.success("Verification Successful!");
        dispatch(loginActions.setRecoverAccountId(response.data.Contents));
      } else {
        toast.error("Invalid Code");
        dispatch(loginActions.setRecoverAccountId(null));
      }
    } catch (error) {
      toast.error("An error has occurred!");
      dispatch(loginActions.setRecoverAccountId(null));
      dispatch(loginActions.setUpdateLoading(false));
    }
  };
};

export const updatePassword = (info, id, navigate, locationPathname) => {
  return async (dispatch) => {
    dispatch(loginActions.setUpdateLoading(true));
    try {
      const response = await axiosApi.post(
        `MyAccount/ChangeRecoveredPassword`,
        {
          Password: info.Password,
          RePassword: info.RePassword,
          AccountId: id,
        },
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      setTimeout(() => {
        dispatch(loginActions.setUpdateLoading(false));
      }, 1000);

      if (response.data.Status.StatusCode !== 200) {
        toast.error(response.data.Contents);
      } else {
        toast.success("Update Successful!");
        dispatch(loginActions.setEmailSentCorrectly(false));
        dispatch(loginActions.setRecoverAccountId(null));

        navigate(`${locationPathname}?modal=auth&tab=login`, { replace: true });
      }
    } catch (error) {
      toast.error("An error has occurred!");
      dispatch(loginActions.setUpdateLoading(false));
    }
  };
};
