import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: null,
};

export const TrackEventsSlice = createSlice({
  name: "trackEvents",
  initialState,
  reducers: {
    reset: (state) => {
      state.url = null;
    },
    setUrl: (state, action) => {
      state.url = action.payload;
    },
  },
});

export const trackEventsActions = TrackEventsSlice.actions;

export default TrackEventsSlice;
