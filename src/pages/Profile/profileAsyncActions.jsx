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

      // const response = await axiosApi.get(
      //   `/MyAffiliate/ /&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
      //   {
      //     signal: signal,
      //     baseURLOverride: config.VITE_WALLET_STORETUBE,
      //   }
      // );

      // if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
      //   throw Error(response.data.Contents);
      // }

      dispatch(
        profileActions.setVerificationLevels({
          level1: 0,
          level2: 0,
          level3: 0,
          level4: 0,
          level5: 0,
          level6: 0,
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

export const uploadKYCFile = (files) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `/AccountVerification/VerifyPersonalInformation`,
        { files },
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        throw Error(response.data.Contents);
      }
      toast.success("Upload Successful");
    } catch (error) {
      const message =
        error?.response?.data?.Status?.Message ||
        error?.message ||
        "Error occurred";
      return { success: false, error: message };
    }
  };
};
