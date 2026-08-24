import { createSlice, current } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  topGames: null,
  verificationLevels: {},
  kycState: null,
  disableVerifyButton: false,
  marketingEmails: false,
  markEmLoading: false,
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
    setKycState: (state, action) => {
      state.kycState = action.payload;
    },
    setDisableVerifyButton: (state, action) => {
      state.disableVerifyButton = action.payload;
    },
    setMarketingEmails: (state, action) => {
      const currentState = current(state)?.marketingEmails;
      // To prevent unnecessary recalculations when the user is set
      if (!_.isEqual(action.payload, currentState)) {
        state.marketingEmails = action.payload;
      }
    },
    setMarkEmLoading: (state, action) => {
      state.markEmLoading = action.payload;
    },
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
