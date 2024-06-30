import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tournamentEvents: {},
    categories: null,
};

export const sportsLiveSlice = createSlice({
    name: 'sportsLive',
    initialState,
    reducers: {
        reset: (state) => {
            state.tournamentEvents = {};
            state.categories = null;
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

export const sportsLiveActions = sportsLiveSlice.actions;

export default sportsLiveSlice;
