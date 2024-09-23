import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    event: null,
    liveEvent: null,
    sportMarketTree: null,
    sports: null,
    selectedMarketCategory: null,
    selectedMarketCategoryIndex: 0,
    sportMarketTreeObj: null,
    changedMarkets: 0,
    liveListOpenSportId: null,
    showingLiveEvent: null,

    sportPregameCategories: null,
    tournamentEvents: null,
};

export const eventSlice = createSlice({
    name: 'event',
    initialState,
    reducers: {
        reset: (state) => {
            state.event = null;
            state.liveEvent = null;
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
        setLiveEvent: (state, action) => {
            state.liveEvent = action.payload;
            state.changedMarkets += 1;
        },
        updateLiveEventHeader: (state, action) => {
            const currentLive = current(state.liveEvent);
            const previousHeader = { ...currentLive.Header };
            state.liveEvent.PreviousHeader = previousHeader;
            state.liveEvent.Header = action.payload;
        },
        updateLiveMarkets: (state, action) => {
            const currentLive = current(state.liveEvent);

            if (!_.isEqual(currentLive.Markets, action.payload)) {
                const previousMarkets = [...currentLive.Markets];
                state.liveEvent.PreviousMarkets = previousMarkets;
                state.liveEvent.Markets = action.payload;

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
        setSportPregameCategories: (state, action) => {
            state.sportPregameCategories = action.payload;
        },
        setTournamentevents: (state, action) => {
            state.tournamentEvents = action.payload;
        },
    },
});

export const eventActions = eventSlice.actions;

export default eventSlice;
