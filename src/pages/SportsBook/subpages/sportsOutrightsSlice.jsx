import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    categories: null,
    tournamentEvents: {},
};

export const sportsOutrightsSlice = createSlice({
    name: 'sportsOutrights',
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

export const sportsOutrightsActions = sportsOutrightsSlice.actions;

export default sportsOutrightsSlice;
