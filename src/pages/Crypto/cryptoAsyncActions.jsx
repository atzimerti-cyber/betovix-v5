import { toast } from "react-toastify";

import { getLang } from "../../utils/storage";
import axiosApi from "../../axios-api";
import { cryptoActions } from "./cryptoSlice";
import config from "../../config";

export const getWallet = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `/Payments/PostData?action=GetPaymentMethods&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
        {},
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error("Failed to fetch crypto");

      const crypto = response.data.Contents;
      dispatch(cryptoActions.setCrypto(crypto));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};

export const GetPaymentMethods = (signal, type) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(
        `Payments/GetPaymentMethods?type=${type}`,
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error("Failed to fetch crypto");

      const types = response.data.Contents;
      if (type === 1) {
        dispatch(cryptoActions.setDepositPaymentTypes(types));
      } else if (type === 2) {
        dispatch(cryptoActions.setWithrawPaymentTypes(types));
      }
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};

export const getCrypto = (signal) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.get(`/Payments/GetCryptoRates`, {
        signal: signal,
        baseURLOverride: config.VITE_WALLET_STORETUBE,
      });

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error("Failed to fetch crypto");

      const crypto = response.data.Contents;
      dispatch(cryptoActions.setCryptoSwiper(crypto));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};

export const getDepositAddress = (signal) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const coin = state.crypto.selectedCurrency;
      const network = state.crypto.selectedNetwork;
      const lang = getLang();

      const response = await axiosApi.post(
        `/Payments/PostData?action=HandlePaymentMethod&lang=${lang.label}&siteid=${config.VITE_SITE_ID}`,
        {
          data: `{ "Name":"${coin.Provider}", "curr": "${network.label}" }`,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error("Failed to fetch Deposit Address");

      const depositAddress = response.data.Contents.WalletAddress;
      const qrImage = response.data.Contents.QrCodeImage;
      //console.log(depositAddress, qrImage);
      dispatch(cryptoActions.setDepositAddress(depositAddress));
      dispatch(cryptoActions.setQRCodeImage(qrImage));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};

export const submitPaymentForm = (signal, depositDTO) => {
  return async (dispatch, getState) => {
    try {
      const response = await axiosApi.post(
        `/Payments/DepositRequest`,
        {
          depositDTO,
        },
        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error("Failed  ");
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};
