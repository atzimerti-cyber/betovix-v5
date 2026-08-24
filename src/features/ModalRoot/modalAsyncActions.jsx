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
        throw new Error(translate("Failed to fetch bonuses"));
      dispatch(modalActions.setBonuses(response.data.Contents));
      dispatch(modalActions.setLoading(false));
    } catch (error) {
      let toastMessage = translate(`${error?.message}`);
      const message = toastMessage || translate("Error fetching bonuses");
      if (error?.code !== "ERR_CANCELED") {
        toast.error(message);
      }
      dispatch(modalActions.setLoading(false));
    }
  };
};

export const getTransactionList = (signal, filter) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      dispatch(modalActions.setLoading(true));
      const response = await axiosApi.post(
        `/MyWalletTransaction/GetTransactionTable?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        filter,

        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.data.Status.StatusCode !== 200)
        throw new Error(translate("Failed to fetch transactions"));

      dispatch(modalActions.setTransactions(response.data.Contents));
      dispatch(modalActions.setLoading(false));
    } catch (error) {
      let toastMessage = translate(`${error?.message}`);
      const message = toastMessage || translate("Error fetching transactions");
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
      const response = await axiosApi.post(
        `bonus/instances/${bonusId}/claim?lang=${lang.id}&siteid=${config.VITE_SITE_ID}`,
        {},
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.data.Status.StatusCode !== 200)
        throw new Error(translate("Failed to claim bonus"));
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

export const cancelBonus = (signal, bonusId) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      dispatch(modalActions.setLoading(true));
      const response = await axiosApi.post(
        `bonus/instances/${bonusId}/cancel`,
        {},
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.data.Status.StatusCode !== 200)
        throw new Error(translate("Failed to cancel bonus"));
      dispatch(modalActions.setLoading(false));

      let toastMessage = translate("Bonus cancelled successfully!");
      toast.success(toastMessage);

      dispatch(getBonuses(signal, 2));
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
        throw new Error(translate("Failed to fetch ticket"));
      dispatch(modalActions.setTicket(response.data.Contents));
      dispatch(modalActions.setLoading(false));
    } catch (error) {
      const message = error?.message || translate("Error fetching ticket");
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
        throw Error(translate(response.data.Contents));

      dispatch(modalActions.setPromoPage(response.data.Contents));
    } catch (error) {
      const message = error?.message
        ? translate(error.message)
        : translate(error);
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};

export const getPromoCodePage = (signal, slug) => {
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

      dispatch(modalActions.setPromoCodePage(response.data.Contents));
    } catch (error) {
      const message = error?.message
        ? translate(error.message)
        : translate(error);
      if (!error?.code === "ERR_CANCELED") toast.error(message);
      
      dispatch(modalActions.setPromoCodePage(null));

    }
  };
};

export const getPromoCodePageByCode = (signal, code) => {
  return async (dispatch, getState) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `/PromoCoupon/GetPageByPromocode?promoCode=${code}&siteid=${config.VITE_SITE_ID}&lang=${lang.id}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_API_BASE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error(response.data.Contents);

      dispatch(modalActions.setPromoCodePage(response.data.Contents));
    } catch (error) {
      const message = error?.message
        ? translate(error.message)
        : translate(error);
      if (!error?.code === "ERR_CANCELED") toast.error(message);
      
      dispatch(modalActions.setPromoCodePage(null));

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
      const message = error?.message
        ? translate(error.message)
        : translate(error);
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};

const isAbortError = (error) => error?.name === "CanceledError" || error?.name === "AbortError" || error?.code === "ERR_CANCELED";

export const getPaymentTransactionDetails = (signal, transactionId) => async () => {
  try {
    const response = await axiosApi.get(`/payments/transactions/${encodeURIComponent(transactionId)}`, {
      signal,
      baseURLOverride: config.VITE_WALLET_API_BASE,
    });
    return response.data;
  } catch (error) {
    if (!isAbortError(error)) {
      toast.error(error?.response?.data?.detail || error?.response?.data?.title || error?.message || translate("Failed to fetch payment transaction details"));
    }
    throw error;
  }
};
