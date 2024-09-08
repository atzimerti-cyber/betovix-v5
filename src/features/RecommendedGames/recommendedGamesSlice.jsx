import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    recommendedGames: null,
};

export const recommendedGamesSlice = createSlice({
    name: 'recommendedGames',
    initialState,
    reducers: {
        reset: (state) => {
            state.recommendedGames = null;
        },
         
        setRecommendedGames: (state, action) => {
            state.recommendedGames = action.payload;
        },
        
    },
});

export const recommendedGamesActions = recommendedGamesSlice.actions;

export default recommendedGamesSlice;