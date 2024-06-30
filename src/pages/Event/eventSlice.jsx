import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    event: null,
    liveEvent: null,
    sportMarketTree: null,
    sports: null,
    selectedMarketCategory: null,
    sportMarketTreeObj: null,
    changedMarkets: 0,
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
            state.sportMarketTreeObj = null;
            state.changedMarkets = 0;
        },
        setSports: (state, action) => {
            state.sports = action.payload;
        },
        setEvent: (state, action) => {
            state.event = action.payload;
            state.changedMarkets = 1;
        },
        setSportMarketTree: (state, action) => {
            state.sportMarketTree = action.payload;
        },
        setSelectedMarketCategory: (state, action) => {
            state.selectedMarketCategory = action.payload;
        },
        setLiveEvent: (state, action) => {
            state.liveEvent = action.payload;
        },
        updateLiveEventHeader: (state, action) => {
            const currentLive = current(state.liveEvent);
            const previousHeader = { ...currentLive.Header };
            state.liveEvent.PreviousHeader = previousHeader;
            state.liveEvent.Header = action.payload;
        },
        updateLiveMarkets: (state, action) => {
            const currentLive = current(state.liveEvent);
            const previousMarkets = [...currentLive.Markets];
            state.liveEvent.PreviousMarkets = previousMarkets;
            state.liveEvent.Markets = action.payload;

            state.changedMarkets += 1;
        },
        setSportMarketTreeObj: (state, action) => {
            state.sportMarketTreeObj = action.payload;
        },
    },
});

export const eventActions = eventSlice.actions;

export default eventSlice;
