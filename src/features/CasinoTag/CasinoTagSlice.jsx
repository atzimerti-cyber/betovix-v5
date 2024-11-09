import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  casinobytag: {},
};

export const CasinoTagSlice = createSlice({
  name: "casinobytag",
  initialState,
  reducers: {
    reset: (state, action) => {
      if (action.payload?.tag) {
        // Clear data for a specific tag if provided
        delete state.casinobytag[action.payload.tag];
      } else {
        // Clear all data if no tag is specified
        state.casinobytag = {};
      }
    },

    setCasinoByTag: (state, action) => {
      const { tag, data } = action.payload;
      state.casinobytag[tag] = data; // Store data under the specific tag
    },
  },
});

export const casinoTagActions = CasinoTagSlice.actions;

export default CasinoTagSlice;
