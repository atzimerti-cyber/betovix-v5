import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promotions: null,
  siteLinks: null,
  serviceLinks: null,
  mainLinks: null,
  gameLinks: null,
};

export const promotionsSlice = createSlice({
  name: "promotions",
  initialState,
  reducers: {
    reset: (state) => {
      state.promotions = null;
    },
    setPromotions: (state, action) => {
      state.promotions = action.payload;
    },
    setSiteLinks: (state, action) => {
      state.siteLinks = action.payload;
    },
    setServiceLinks: (state, action) => {
      state.serviceLinks = action.payload;
    },
    setMainLinks: (state, action) => {
      state.mainLinks = action.payload;
    },
    setGameLinks: (state, action) => {
      state.gameLinks = action.payload;
    },
  },
});

export const promotionsActions = promotionsSlice.actions;

export default promotionsSlice;
