import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rpg: null,
};

export const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    reset: (state) => {
      state.rpg = null;
    },

    setRpg: (state, action) => {
      state.rpg = action.payload;
    },
  },
});

export const pagesActions = pagesSlice.actions;

export default pagesSlice;
