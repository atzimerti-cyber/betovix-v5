import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    casinoFavs: null,
};

export const casinoFavoritesSlice = createSlice({
    name: 'casinoFavorites',
    initialState,
    reducers: {
        reset: (state) => {
            state.casinoFavs = null;
        },
         
        setCasinoFavs: (state, action) => {
            state.casinoFavs = action.payload;
        },
        
    },
});

export const casinoFavoritesActions = casinoFavoritesSlice.actions;

export default casinoFavoritesSlice;
