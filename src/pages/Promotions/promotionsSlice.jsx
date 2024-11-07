import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  promotions: null,
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
  },
});

export const promotionsActions = promotionsSlice.actions;

export default promotionsSlice;
