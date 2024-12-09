import { toast } from "react-toastify";

import axiosApi from "../../axios-api";
import { getLang } from "../../utils/storage";
import { modalActions } from "./modalSlice";
import config from "../../config";

import levels from "../../dummyData/levels";
import rewards from "../../dummyData/rewards";
import { translate } from "../../utils/translations";

export const getBonuses = (signal, status) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      dispatch(modalActions.setLoading(true));
      const response = await axiosApi.get(
        `/BonusForAccount/GetMyBonusesByStatus?status=${status}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.data.Status.StatusCode !== 200)
        throw new Error("Failed to fetch bonuses");
      dispatch(modalActions.setBonuses(response.data.Contents));
      dispatch(modalActions.setLoading(false));
    } catch (error) {
      let toastMessage = translate(`${error?.message}`);
      const message = toastMessage || "Error fetching bonuses";
      if (error?.code !== "ERR_CANCELED") {
        toast.error(message);
      }
      dispatch(modalActions.setLoading(false));
    }
  };
};

export const claimBonus = (signal, bonusId, callback) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      dispatch(modalActions.setLoading(true));
      const response = await axiosApi.get(
        `/BonusForAccount/ClaimBonus?bonusFaId=${bonusId}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.data.Status.StatusCode !== 200)
        throw new Error("Failed to claim bonus");
      dispatch(modalActions.setLoading(false));

      let toastMessage = translate("Bonus claimed successfully!");
      toast.success(toastMessage);
      if (callback) callback();
    } catch (error) {
      let toastMessage = translate(`${error?.message}`);
      const message = toastMessage || translate("Error claiming bonus");
      if (error?.code !== "ERR_CANCELED") toast.error(message);

      dispatch(modalActions.setLoading(false));
    }
  };
};

export const cancelBonus = (signal, bonus) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      dispatch(modalActions.setLoading(true));
      const response = await axiosApi.post(
        `/BonusForAccount/PostData?action=BonusForAccountSave&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        bonus,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.data.Status.StatusCode !== 200)
        throw new Error("Failed to cancel bonus");
      dispatch(modalActions.setLoading(false));

      let toastMessage = translate("Bonus cancelled successfully!");
      toast.success(toastMessage);
    } catch (error) {
      let toastMessage = translate(`${error?.message}`);
      const message = toastMessage || translate("Failed to cancel bonus");
      if (error?.code !== "ERR_CANCELED") toast.error(message);

      dispatch(modalActions.setLoading(false));
    }
  };
};

export const getTicket = (signal, id) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      dispatch(modalActions.setLoading(true));
      const response = await axiosApi.get(
        `/MyTicket/GetTicket?TicketId=${id}&lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.data.Status.StatusCode !== 200)
        throw new Error("Failed to fetch ticket");
      dispatch(modalActions.setTicket(response.data.Contents));
      dispatch(modalActions.setLoading(false));
    } catch (error) {
      const message = error?.message || "Error fetching ticket";
      if (error?.code !== "ERR_CANCELED") toast.error(message);
      dispatch(modalActions.setLoading(false));
    }
  };
};

export const getPromoPageById = (signal, id) => {
  return async (dispatch, getState) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `/Pages/GetPageById?pageId=${id}&siteid=${config.VITE_SITE_ID}&lang=${lang.id}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error(response.data.Contents);

      dispatch(modalActions.setPromoPage(response.data.Contents));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};

export const getPromoPageBySlug = (signal, slug) => {
  return async (dispatch, getState) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `/Pages/GetPageBySlugAndLang?slug=${slug}&siteid=${config.VITE_SITE_ID}&lang=${lang.id}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error(response.data.Contents);

      dispatch(modalActions.setPromoPage(response.data.Contents));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};
