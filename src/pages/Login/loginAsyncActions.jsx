import axiosApi from "../../axios-api";

import { loginActions } from "./loginSlice";
import { layoutActions } from "../../../src/features/Layout/layoutSlice";
import { gamificationActions } from "../UserGamification.jsx/userGamificationSlice";
import { getLang } from "../../utils/storage";

import { toast } from "react-toastify";
import { setAccessToken } from "../../utils/auth";
import config from "../../config";
import { translate } from "../../utils/translations";
import { profileActions } from "../Profile/profileSlice";

export const logingGoogle = (loginInfo, navigate, locationPathname) => {
  return async (dispatch) => {
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
      toast.error(translate(error?.message));
      dispatch(loginActions.setLoginLoading(false));
    }
  };
};
export const login = (loginInfo, navigate, locationPathname, onSuccess) => {
  return async (dispatch) => {
    dispatch(loginActions.setLoginLoading(true));

    try {
      const response = await axiosApi.post(
        `login/Authenticate2?siteId=${config.VITE_SITE_ID}`,
        loginInfo,
        {
          // baseURLOverride: config.VITE_WALLET_API_BASE,
          baseURLOverride: config.VITE_LOGIN_URL,
        }
      );
      if (response.data.Status.StatusCode !== 200) {
        if (response.data.Status.StatusCode === 409) {
          let toastMessage = translate("Your account needs to be verified.");
          dispatch(loginActions.setMailToVerify(response.data.Contents?.Item3));
          navigate(`${locationPathname}?modal=verify`, {
            replace: false,
          });
          throw Error(toastMessage);
        } else {
          const errorm = response.data.Contents?.Item1
            ? response.data.Contents?.Item1
            : response.data.Contents;
          throw Error(errorm);
        }
      }

      if (response.data.Contents?.Status === 301) {
        navigate(`${locationPathname}?modal=tfa`, {
          replace: true,
        });
        dispatch(loginActions.setTFAtoken(response.data.Contents.Token));

        let message = response.data.Contents?.Username;

        if (!message) message = "Redirecting to TFA";
        throw Error(message);
      }

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

      if (onSuccess) onSuccess();

      return { success: true };
    } catch (error) {
      const message = error?.message || "Invalid Login";
      toast.error(translate(message));
      dispatch(loginActions.setLoginLoading(false));

      return { success: false };
    }
  };
};

export const verifyTfa = (signal, code, token, navigate, locationPathname) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      const response = await axiosApi.get(
        `login/Authenticate3?Data=${token}&OTP=${code}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );
      if (response.data.Status.StatusCode === 200) {
        toast.success(translate("Account verified successfully"));
        setAccessToken(response.data.Contents.Token);

        const response2 = await axiosApi.get(
          `login/State/?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
          {
            baseURLOverride: config.VITE_WALLET_API_BASE,
          }
        );
        if (response2.data.Status.StatusCode !== 200)
          throw Error(response2.data.Contents);

        dispatch(loginActions.setUser(response2.data.Contents));
        navigate(locationPathname, { replace: true });
      } else {
        toast.error(translate(response.data.Contents));
      }
    } catch (error) {
      toast.error(translate("An error has occurred!"));
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

      if (response1.data.Contents == true) {
        toast.error(translate("Username already exists") + ".");
        dispatch(loginActions.setLoginLoading(false));
      } else if (response1.data.Contents == false) {
        response2 = await axiosApi.post(
          `MyAccount/Register/?lang=en&siteid=${config.VITE_SITE_ID}`,
          {
            TCNumber:
              registerInfo.idCode === "true" ? null : registerInfo.idCode,
            Code: registerInfo.code,
            Email: registerInfo.email,
            Password: registerInfo.password,
            Country: registerInfo.country,
            SiteId: config.VITE_SITE_ID,
            Username: registerInfo.displayName,
            FirstName:
              registerInfo.firstName === "true" ? null : registerInfo.firstName,
            LastName:
              registerInfo.lastName === "true" ? null : registerInfo.lastName,
            Phone:
              registerInfo.phoneNumber &&
              registerInfo.phoneNumber !== "true" &&
              registerInfo.phoneNumber.replace(/\+/g, ""),
            BirthDate:
              registerInfo.birthDate === "true" ? null : registerInfo.birthDate,
          },
          {
            baseURLOverride: config.VITE_WALLET_API_BASE,
          }
        );
        if (response2.data.Status.StatusCode !== 200) {
          toast.error(translate(response2.data.Contents));
        } else {
          let toastMessage1 = translate(`Success`);
          let toastMessage2 = translate(
            `Please check your email to verify your registration`
          );
          toast.success(`${toastMessage1}! ${toastMessage2}.`);
          dispatch(loginActions.setMailToVerify(registerInfo.email));
          navigate(`${locationPathname}?modal=verify`, {
            replace: true,
          });
        }
        dispatch(loginActions.setLoginLoading(false));
        console.log(response2);
      }
      dispatch(loginActions.setLoginLoading(false));
    } catch (error) {
      dispatch(loginActions.setLoginLoading(false));
      toast.error(translate("An error has occurred"));
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
        toast.success(translate(response.data.Contents));
        setAccessToken(response.data.Contents.Token);

        const response2 = await axiosApi.get(
          `login/State/?lang=en&siteid=${config.VITE_SITE_ID}`,
          {
            baseURLOverride: config.VITE_WALLET_API_BASE,
          }
        );
        if (response2.data.Status.StatusCode !== 200)
          throw Error(response2.data.Contents);

        const user = {
          ...response2.data.Contents,
        };

        dispatch(loginActions.setUser(user));
        navigate(`/`, { replace: true });
      } else {
        toast.error(translate(response.data.Contents));
        navigate(``, { replace: true });
        dispatch(loginActions.setLoginLoading(false));
      }
    } catch (error) {
      toast.error(translate("An error has occurred"));
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
      toast.error(translate("An error has occurred"));
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
        }
      );
      if (response.data.Status.StatusCode !== 200)
        dispatch(loginActions.logout());
      else {
        const user = {
          ...response.data.Contents,
        };

        const siteSettings = getState().login;
        const gamificationPermission = siteSettings.permissions;

        if (gamificationPermission.AllowGamification) {
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
        }

        dispatch(loginActions.setUser(user));
        dispatch(
          profileActions.setMarketingEmails(user.MyPermissions.AllowToSendPromo)
        );
        dispatch(layoutActions.setAvailableBonus(user));
        dispatch(layoutActions.setAvailableBonusBalance(user));
      }
    } catch (error) {
      null;
    }
  };
};

export const sentRecoveryUsername = (username) => {
  return async (dispatch, getState) => {
    dispatch(loginActions.setUpdateLoading(true));
    const lang = getLang();
    try {
      const response = await axiosApi.get(
        `/MyAccount/RecoverPassword?username=${username}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );
      setTimeout(() => {
        dispatch(loginActions.setUpdateLoading(false));
      }, 1000);

      if (response.data.Status.StatusCode === 200) {
        toast.success(translate(response.data.Contents));
        dispatch(loginActions.setUsernameSentCorrectly(true));
      } else {
        toast.error(translate("Please ensure your username is correct"));
        dispatch(loginActions.setUsernameSentCorrectly(false));
      }
    } catch (error) {
      toast.error(translate("An error has occurred"));
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
        toast.success(translate("Verification Successful") + "!");
        dispatch(loginActions.setRecoverAccountId(response.data.Contents));
      } else {
        toast.error(translate("Invalid Code"));
        dispatch(loginActions.setRecoverAccountId(null));
      }
    } catch (error) {
      toast.error(translate("An error has occurred"));
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
        toast.error(translate(response.data.Contents));
      } else {
        let toastMessage1 = translate(`Update Successful!`);
        toast.success(`${toastMessage1}.`);
        dispatch(loginActions.setUsernameSentCorrectly(false));
        dispatch(loginActions.setRecoverAccountId(null));

        navigate(`${locationPathname}?modal=auth&tab=login`, { replace: true });
      }
    } catch (error) {
      let toastMessage1 = translate(`An error has occurred`);
      toast.error(`${toastMessage1}.`);
      dispatch(loginActions.setUpdateLoading(false));
    }
  };
};

export const resendEmail = (data) => {
  return async (dispatch) => {
    dispatch(loginActions.setUpdateLoading(true));
    try {
      const response = await axiosApi.get(
        `MyAccount/ResendAccVerificationEmail?data=${data}&siteid=${config.VITE_SITE_ID}`,
        {
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.data.Status.StatusCode !== 200) {
        dispatch(loginActions.setUpdateLoading(false));
        let toastMessage1 = translate(`An error has occurred`);
        toast.error(`${toastMessage1}.`);
      } else {
        let toastMessage1 = translate(`Success`);
        let toastMessage2 = translate(
          `Please check your email to verify your registration`
        );
        toast.success(`${toastMessage1}! ${toastMessage2}.`);
        dispatch(loginActions.setUpdateLoading(false));
      }
    } catch (error) {
      let toastMessage1 = translate(`An error has occurred`);
      toast.error(`${toastMessage1}.`);
      dispatch(loginActions.setUpdateLoading(false));
    }
  };
};
