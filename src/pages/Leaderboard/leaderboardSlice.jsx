import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    leaderboard: null,
    loadingLeaderboard: false,
};

export const leaderboardSlice = createSlice({
    name: 'leaderboard',
    initialState,
    reducers: {
        reset: (state) => {
            state.leaderboard = null;
        },
        setLeaderboard: (state, action) => {
            state.leaderboard = action.payload;
        },
        setLoadingLeaderboard: (state, action) => {
            state.loadingLeaderboard = action.payload;
        },
    },
});

export const leaderboardActions = leaderboardSlice.actions;

export default leaderboardSlice;
