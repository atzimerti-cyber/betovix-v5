import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  casinobytag: null,
};

export const CasinoTagSlice = createSlice({
  name: "casinobytag",
  initialState,
  reducers: {
    reset: (state) => {
      state.casinobytag = null;
    },

    setCasinoByTag: (state, action) => {
      state.casinobytag = action.payload;
    },
  },
});

export const casinoTagActions = CasinoTagSlice.actions;

export default CasinoTagSlice;
