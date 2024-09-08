import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    casinoCrashGames: null,
};

export const crashGamesSlice = createSlice({
    name: 'crashGames',
    initialState,
    reducers: {
        reset: (state) => {
            state.casinoCrashGames = null;
        },
         
        setCasinoCrashGames: (state, action) => {
            state.casinoCrashGames = action.payload;
        },
        
    },
});

export const casinoCrashGamesActions = crashGamesSlice.actions;

export default crashGamesSlice;