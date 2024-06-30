import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    casinoBanners: null,
    casinoItems: null,
    sportBanners: null,
    eventsTop: null,
    levels: null,
};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        reset: (state) => {
            state.casinoBanners = null;
            state.casinoItems = null;
            state.sportBanners = null;
            state.eventsTop = null;
            state.levels = null;
        },
        setCasinoBanners: (state, action) => {
            state.casinoBanners = action.payload;
        },
        setCasinoItems: (state, action) => {
            state.casinoItems = action.payload;
        },
        setSportBanners: (state, action) => {
            state.sportBanners = action.payload;
        },
        setEventsTop: (state, action) => {
            state.eventsTop = action.payload;
        },
        setLevels: (state, action) => {
            state.levels = action.payload;
        },
    },
});

export const homeActions = homeSlice.actions;

export default homeSlice;
