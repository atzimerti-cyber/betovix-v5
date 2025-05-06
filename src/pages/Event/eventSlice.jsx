import { createSlice, current } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  event: null,
  sportMarketTree: null,
  sports: null,
  selectedMarketCategory: null,
  selectedMarketCategoryIndex: 0,
  sportMarketTreeObj: null,
  changedMarkets: 0,
  liveListOpenSportId: null,
  showingLiveEvent: null,
  favMarkets: null,
  sportPregameCategories: null,
  tournamentEvents: null,
  ////BET BUILDER///////
  combinationMap: null,
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    reset: (state) => {
      state.event = null;
      state.sportMarketTree = null;
      state.sports = null;
      state.selectedMarketCategory = null;
      state.selectedMarketCategoryIndex = 0;
      state.sportMarketTreeObj = null;
      state.changedMarkets = 0;
      state.liveListOpenSportId = null;
      state.showingLiveEvent = null;
      state.sportPregameCategories = null;
      state.tournamentEvents = null;
    },
    setSports: (state, action) => {
      state.sports = action.payload;
    },
    setEvent: (state, action) => {
      state.event = action.payload;
      state.changedMarkets += 1;
    },
    setSportMarketTree: (state, action) => {
      state.sportMarketTree = action.payload;
    },
    setSelectedMarketCategory: (state, action) => {
      state.selectedMarketCategory = action.payload;
    },
    setSelectedMarketCategoryIndex: (state, action) => {
      state.selectedMarketCategoryIndex = action.payload;
    },
    updateLiveEventHeader: (state, action) => {
      const currentLive = current(state.event);
      const previousHeader = { ...currentLive.Header };
      state.event.PreviousHeader = previousHeader;
      state.event.Header = action.payload;
    },
    updateLiveMarkets: (state, action) => {
      const currentLive = current(state.event);

      if (!_.isEqual(currentLive.Markets, action.payload)) {
        const previousMarkets = [...currentLive.Markets];
        state.event.PreviousMarkets = previousMarkets;
        state.event.Markets = action.payload;

        state.changedMarkets += 1;
      }
    },
    setSportMarketTreeObj: (state, action) => {
      state.sportMarketTreeObj = action.payload;
    },
    setLiveListOpenSportId: (state, action) => {
      state.liveListOpenSportId = action.payload;
    },
    setShowingLiveEvent: (state, action) => {
      state.showingLiveEvent = action.payload;
    },
    setFavMarkets: (state, action) => {
      state.favMarkets = action.payload;
    },
    setSportPregameCategories: (state, action) => {
      state.sportPregameCategories = action.payload;
    },
    setTournamentevents: (state, action) => {
      state.tournamentEvents = action.payload;
    },
    removeEvents: (state, action) => {
      const currentLive = current(state.event);

      for (let i = 0; i < action.payload.length; i++) {
        const eventId = action.payload[i];
        if (currentLive.MatchId === eventId) {
          state.event = null;
          state.changedMarkets += 1;
        }
      }
    },
    setCombinationMap: (state, action) => {
      state.combinationMap = action.payload;
    },
  },
});

export const eventActions = eventSlice.actions;

export default eventSlice;
