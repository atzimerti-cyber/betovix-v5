import { toast } from "react-toastify";

import { getLang } from "../../utils/storage";
import axiosApi from "../../axios-api";
import { profileActions } from "./profileSlice";
import config from "../../config";
import { translate } from "../../utils/translations";
import { loginActions } from "../Login/loginSlice";

export const getOverview = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          data: `{"Page":1,"PageItems":24,"Tag":"slot","Search":""}`,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_CASINO_BASE,
        }
      );

      if (response.data.Status.StatusCode !== 200) throw Error();

      dispatch(profileActions.setTopGames(response.data.Contents));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const subscribeToEmails = (signal, state) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `/Permission/SaveAllowPromo?allow=${state}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_UPLOAD,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw new Error(
          translate("Something went wrong. Please try again later")
        );
      }

      if (state === true) {
        dispatch(profileActions.setMarketingEmails(true));
      } else {
        dispatch(profileActions.setMarketingEmails(false));
      }
    } catch (error) {
      const message = translate("Error occurred");
      toast.error(translate(message));
    }
  };
};

export const getHeroes = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(`/Gamification/GetAllHeroes`, {
        signal: signal,
        baseURLOverride: config.VITE_WALLET_STORETUBE,
      });

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error(response.data.Contents);

      const heroes = response.data.Contents;
      console.log("All Heroes:", heroes);
      dispatch(profileActions.setHeroes(heroes));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const getLevels = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `/Payments/PostData?action=GetPaymentMethods&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          data: `{"Id":""}`,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error("Failed to fetch heroes");

      const levels = response.data.Contents;
      console.log("All Levels:", levels);
      dispatch(profileActions.setHeroes(levels));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const changePassword = (signal, payload) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `/MyAffiliate/ChangePassword/&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          OldPass: payload.OldPass,
          Password: payload.Password,
          RePassword: payload.RePassword,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error("Failed to change password");
    } catch (error) {
      const message = error?.message ? error.message : error;
      toast.error(translate(message));
      if (!error?.code === "ERR_CANCELED") toast.error(translate(message));
    }
  };
};

export const changeUsername = (signal, oldUsername, newUsername, password) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const payload = {
        OldUsername: `${oldUsername}`,
        NewUsername: `${newUsername}`,
        Password: `${password}`,
        SiteId: config.VITE_SITE_ID,
      };

      const response = await axiosApi.post(
        `/MyAccount/ChangeUsername`,
        payload,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw new Error(response.data.Status.Message || response.data.Contents);
      }

      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error?.response?.data?.Status?.Message ||
        error?.message ||
        "Error occurred";
      return { success: false, error: translate(message) };
    }
  };
};

export const getLevelsVerified = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `/AccountVerification/GetVerificationStatus`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      // Check for a successful response
      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw Error(response.data.Contents);
      }

      const contents = response.data.Contents;

      dispatch(
        profileActions.setVerificationLevels({
          level1: contents[1] || 0,
          level2: contents[2] || 0,
          level3: contents[3] || 0,
          level4: contents[4] || 0,
          level5: contents[5] || 0,
          level6: contents[6] || 0,
        })
      );
    } catch (error) {
      const message =
        error?.response?.data?.Status?.Message ||
        error?.message ||
        "Error occurred";
      return { success: false, error: message };
    }
  };
};

export const submitPersonalInfo = (personalInfo, signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `/AccountVerification/VerifyPersonalInformation`,
        personalInfo,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw new Error(response.data.Contents);
      }

      dispatch(getLevelsVerified(signal));
      toast.success(translate("Verification Request Successful"));
      return { success: true }; // Return success if needed
    } catch (error) {
      const message =
        error?.response?.data?.Status?.Message ||
        error?.message ||
        "Error occurred";
      return { success: false, error: translate(message) };
    }
  };
};

export const uploadKYCFile = (file, level, signal) => {
  return async (dispatch) => {
    try {
      dispatch(profileActions.setDisableVerifyButton(true));
      const lang = getLang();

      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosApi.post(
        `/Upload/PostKYCFile?verificationLevel=${level}`,
        formData,
        {
          signal: signal,
          baseURLOverride: config.VITE_UPLOAD,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw new Error(response.data.Contents);
      }

      dispatch(getLevelsVerified(signal));
      toast.success(translate("Upload Successful"));
      dispatch(profileActions.setDisableVerifyButton(false));
      return { success: true };
    } catch (error) {
      dispatch(profileActions.setDisableVerifyButton(false));
      const message =
        error?.response?.data?.Status?.Message ||
        error?.message ||
        "Error occurred";
      toast.error(translate(message) + ".");
      return { success: false, error: message };
    }
  };
};

export const selfExclusion = (signal, payload) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `/SelfExclusion/SelfExclusion?siteid=${config.VITE_SITE_ID}`,
        payload,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw new Error(response.data.Contents);
      }

      const message = translate(`Your request was successful`);
      toast.success(message);
      window.location.reload();
      dispatch(loginActions.logout());
    } catch (error) {
      const message = translate(
        `Something went wrong. Please contact our customer support.`
      );
      toast.error(message);
    }
  };
};
