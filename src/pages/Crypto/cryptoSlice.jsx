import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crypto: null,
  cryptoSwiper: null,
  selectedCurrency: null,
  selectedNetwork: null,
  paymentsLoading: false,
  depositAddress: "",
  qrCodeImage: "",
  //////////DEPOSIT//////////////
  DepositPaymentTypes: null,
  selectedPaymentTypeDeposit: null,
  selectedPaymentMethodDeposit: null,
  /////////WITHDRAW////////////////
  WithdrawPaymentTypes: null,
  selectedPaymentTypeWithdraw: null,
  selectedPaymentMethodWithdraw: null,
  withdrawRequestMessage: null,
  withdrawals: null,
  withdrawLimitMessage: null,
  ///////PAYMENTS///////
  typeMinAmount: null,
  typeMaxAmount: null,
  methodMinAmount: null,
  methodMaxAmount: null,
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
      state.depositAddress = "";
    },
    resetPayments: (state) => {
      state.DepositPaymentTypes = null;
      state.selectedPaymentTypeDeposit = null;
      state.selectedPaymentMethodDeposit = null;
      state.WithdrawPaymentTypes = null;
      state.selectedPaymentTypeWithdraw = null;
      state.selectedPaymentMethodWithdraw = null;
      state.withdrawRequestMessage = null;
      state.withdrawals = null;
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
    setPaymentsLoading: (state, action) => {
      state.paymentsLoading = action.payload;
    },
    setDepositAddress: (state, action) => {
      state.depositAddress = action.payload;
    },
    setQRCodeImage: (state, action) => {
      state.qrCodeImage = action.payload;
    },
    //////////DEPOSIT//////////////
    setDepositPaymentTypes: (state, action) => {
      state.DepositPaymentTypes = action.payload;
    },
    setSelectedPaymentTypeDeposit: (state, action) => {
      state.selectedPaymentTypeDeposit = action.payload;
    },
    setSelectedPaymentMethodDeposit: (state, action) => {
      state.selectedPaymentMethodDeposit = action.payload;
    },
    /////////WITHDRAW////////////////
    setWithrawPaymentTypes: (state, action) => {
      state.WithdrawPaymentTypes = action.payload;
    },
    setSelectedPaymentTypeWithdraw: (state, action) => {
      state.selectedPaymentTypeWithdraw = action.payload;
    },
    setSelectedPaymentMethodWithdraw: (state, action) => {
      state.selectedPaymentMethodWithdraw = action.payload;
    },
    setWithdrawRequestMessage: (state, action) => {
      state.withdrawRequestMessage = action.payload;
    },
    setWithdrawals: (state, action) => {
      state.withdrawals = action.payload;
    },
    setWithdrawLimitMessage: (state, action) => {
      state.withdrawLimitMessage = action.payload;
    },
    ///////PAYMENTS///////
    setTypeMinAmount: (state, action) => {
      state.typeMinAmount = action.payload;
    },
    setTypeMaxAmount: (state, action) => {
      state.typeMaxAmount = action.payload;
    },
    setMethodMinAmount: (state, action) => {
      state.methodMinAmount = action.payload;
    },
    setMethodMaxAmount: (state, action) => {
      state.methodMaxAmount = action.payload;
    },
  },
});

export const cryptoActions = cryptoSlice.actions;

export default cryptoSlice;
