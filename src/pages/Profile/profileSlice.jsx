import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
  topGames: null,
  verificationLevels: {},
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
  },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
