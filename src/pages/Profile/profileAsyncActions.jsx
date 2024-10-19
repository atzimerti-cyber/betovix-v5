import { toast } from "react-toastify";

import { getLang } from "../../utils/storage";
import axiosApi from "../../axios-api";
import { profileActions } from "./profileSlice";
import config from "../../config";

export const getOverview = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `MyCasino/PostData?action=getGamesWithFilter&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
        {
          // data: `{"Page":1,"PageItems":24,"Tag":"slot","Search":"","ProviderId":1,"BrandId":0,"VendorId":0}`,
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
      if (!error?.code === "ERR_CANCELED") toast.error(message);
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

      // if (response.status !== 200 || response.data.Status.StatusCode !== 200) throw Error('Failed to fetch heroes');
      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error(response.data.Contents);

      const heroes = response.data.Contents;
      console.log("All Heroes:", heroes);
      dispatch(profileActions.setHeroes(heroes));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};

export const getLevels = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `/Payments/PostData?action=GetPaymentMethods&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
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
      if (!error?.code === "ERR_CANCELED") toast.error(message);
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
      toast.error(message);
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};

export const changeUsername = (signal, payload) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `/MyAffiliate/ChangeUsername/&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {},
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw new Error(
          response.data.Status.Message || "Failed to change password"
        );
      }

      return { success: true, data: response.data };
    } catch (error) {
      const message =
        error?.response?.data?.Status?.Message ||
        error?.message ||
        "Error occurred";
      return { success: false, error: message };
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
      toast.success("Verification Request Successful");
      return { success: true }; // Return success if needed
    } catch (error) {
      const message =
        error?.response?.data?.Status?.Message ||
        error?.message ||
        "Error occurred";
      return { success: false, error: message };
    }
  };
};

export const uploadKYCFile = (file, level, signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosApi.post(
        `/Upload/PostKYCFile?verificationLevel=${level}`,
        formData,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw new Error(response.data.Contents);
      }

      dispatch(getLevelsVerified(signal));
      toast.success("Upload Successful");
      return { success: true }; // Return success if needed
    } catch (error) {
      const message =
        error?.response?.data?.Status?.Message ||
        error?.message ||
        "Error occurred";
      return { success: false, error: message };
    }
  };
};
