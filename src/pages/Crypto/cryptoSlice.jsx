import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crypto: null,
  cryptoSwiper: null,
  selectedCurrency: null,
  selectedNetwork: null,
  depositAddress: "",
  qrCodeImage: "",
  paymentTypes: null,
  selectedPaymentType: null,
  selectedPaymentMethod: null,
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
    setSelectedPaymentMethod: (state, action) => {
      state.selectedPaymentMethod = action.payload;
    },
  },
});

export const cryptoActions = cryptoSlice.actions;

export default cryptoSlice;
