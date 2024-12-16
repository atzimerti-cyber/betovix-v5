import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rpg: null,
  page: null,
};

export const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    reset: (state) => {
      state.page = null;
    },

    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const pagesActions = pagesSlice.actions;

export default pagesSlice;
