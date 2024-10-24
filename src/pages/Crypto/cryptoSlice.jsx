import { createSlice } from "@reduxjs/toolkit";

import bnb from "../../assets/cryptoIcons/bnb.svg";
import btc from "../../assets/cryptoIcons/btc.svg";
import xrp from "../../assets/cryptoIcons/xrp.svg";
import trx from "../../assets/cryptoIcons/trx.svg";
import sol from "../../assets/cryptoIcons/sol.svg";
import eth from "../../assets/cryptoIcons/eth.svg";
import ltc from "../../assets/cryptoIcons/ltc.svg";
import ape from "../../assets/cryptoIcons/ape.svg";
import doge from "../../assets/cryptoIcons/doge.svg";
import shib from "../../assets/cryptoIcons/shib.png";
import usdt from "../../assets/cryptoIcons/usdt.svg";

const initialState = {
  crypto: null,
  cryptoSwiper: null,
  selectedCurrency: null,
  selectedNetwork: null,
  depositAddress: "",
  qrCodeImage: "",
  paymentTypes: null,
  selectedPaymentType: null,
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    reset: (state) => {
      if (state) {
        state.selectedCurrency = null;
        state.selectedNetwork = null;
        state.depositAddress = "";
      }
      //state.crypto = null;
    },
    resetCurrency: (state) => {
      state.selectedCurrency = null;
      state.selectedNetwork = null;
      state.depositAddress = "";
    },
    setCrypto: (state, action) => {
      state.crypto = action.payload;
    },
    setCryptoSwiper: (state, action) => {
      state.cryptoSwiper = action.payload;
    },
    setSelectedCurrency: (state, action) => {
      state.selectedCurrency = action.payload;
    },
    setSelectedNetwork: (state, action) => {
      state.selectedNetwork = action.payload;
    },
    setDepositAddress: (state, action) => {
      state.depositAddress = action.payload;
    },
    setQRCodeImage: (state, action) => {
      state.qrCodeImage = action.payload;
    },
    setPaymentTypes: (state, action) => {
      state.paymentTypes = action.payload;
    },
    setSelectedPaymentType: (state, action) => {
      state.selectedPaymentType = action.payload;
    },
  },
});

export const cryptoActions = cryptoSlice.actions;

export default cryptoSlice;
