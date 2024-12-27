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

export const getDepositAddress = (signal, provider, network) => {
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

export const submitDepositForm = (signal, depositDTO) => {
  return async (dispatch, getState) => {
    try {
      const response = await axiosApi.post(
        `/Payments/DepositRequest`,

        depositDTO,

        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200) {
        dispatch(cryptoActions.setWithdrawLimitMessage(response.data.Contents));
        return;
      }

      if (
        depositDTO.PaymentProvider === "Interkassa" ||
        depositDTO.PaymentProvider === "Chapa"
      ) {
        window.location.href = response.data.Contents;
      } else if (depositDTO.PaymentProvider === "CoinPayments") {
        dispatch(
          cryptoActions.setDepositAddress(response.data.Contents.WalletAddress)
        );
      }
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};
export const submitWithdrawForm = (signal, withrawDTO) => {
  return async (dispatch, getState) => {
    try {
      const response = await axiosApi.post(
        `/Payments/WithdrawRequest`,

        withrawDTO,

        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200) throw Error("Failed");
      if (response.data.Status.StatusCode === 410) {
        dispatch(cryptoActions.setWithdrawLimitMessage(response.data.Contents));
        return;
      }

      dispatch(cryptoActions.setWithdrawRequestMessage(response.data.Contents));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};

export const getWithrawalReqs = (signal, page, count, sort, status) => {
  return async (dispatch) => {
    try {
      const lang = getLang();

      const response = await axiosApi.post(
        `/Payments/PostData?action=WithdrawRequestsTable&lang=${lang.id}`,

        {
          data: `{"page":${page},"count":${count},"sort":"${sort}","filter":{"Status":"${status}"}}`,
        },

        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error("Failed");

      let withdrawReqs = response.data.Contents.Rows.map((req) => ({
        reqId: req.Data.Id,
        accountid: req.Data.AccountId,
        amount: req.Data.Amount !== 0 ? req.Data.Amount : req.Data.AmountCr,
        currency: req.Data.Currency,
        dateAdded: req.Data.DateAdded,
        dateCompleted: req.Data.DateCompleted,
        dateUpdated: req.Data.DateUpdated,
        note: req.Data.Note,
        status: req.Data.Status,
      }));

      const total = response.data.Contents.Total;

      // Combine requests and total in the desired structure
      const result = { requests: withdrawReqs, total };

      dispatch(cryptoActions.setWithdrawals(result));
    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};

export const cancelWithdrawRequest = (signal, id, onSuccess) => {
  return async (dispatch) => {
    try {
      const lang = getLang();
      
      const response = await axiosApi.post(
        `/Payments/PostData?action=WithdrawRequestsCancel&lang=${lang.id}`,

        {
          data: id,
        },

        {
          signal: signal,
          baseURLOverride: config.VITE_WALLET_STORETUBE,
        }
      );

      if (response.status !== 200 || response.data.Status.StatusCode !== 200)
        throw Error("Failed");


      if(response.data.Contents === true) {
        toast.success('Withdraw Request Cancelled');
        if (onSuccess) onSuccess();
      }
      else throw Error("Failed")

    } catch (error) {
      const message = error?.message ? error.message : error;
      if (!error?.code === "ERR_CANCELED") toast.error(message);
    }
  };
};
