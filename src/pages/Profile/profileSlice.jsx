import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  topGames: null,
  verificationLevels: {},
  disableVerifyButton: false,
  marketingEmails: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state) => {
      state.topGames = null;
    },
    setTopGames: (state, action) => {
      state.topGames = action.payload;
    },
    setVerificationLevels: (state, action) => {
      state.verificationLevels = action.payload;
    },
    setDisableVerifyButton: (state, action) => {
      state.disableVerifyButton = action.payload;
    },
    setMarketingEmails: (state, action) => {
      state.marketingEmails = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
