import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sports: null,
    tournamentEvents: {},
    categories: null,
};

export const sportsHomeSlice = createSlice({
    name: 'sportsHome',
    initialState,
    reducers: {
        reset: (state) => {
            state.sports = null;
            state.tournamentEvents = {};
            state.categories = null;
        },
        setSports: (state, action) => {
            state.sports = action.payload;
        },
        setTournamentEvents: (state, action) => {
            state.tournamentEvents = action.payload;
        },
        addTournamentEvents: (state, action) => {
            state.tournamentEvents[action.payload.tournamentId] = action.payload.events;
        },
        setCategories: (state, action) => {
            state.categories = action.payload;
        },
    },
});

export const sportsHomeActions = sportsHomeSlice.actions;

export default sportsHomeSlice;
