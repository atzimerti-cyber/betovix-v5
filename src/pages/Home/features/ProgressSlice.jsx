import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentLevel: {},
    progressBar: null,
    selectedHero: null,
    nextLevel: {},
};

export const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
        reset: (state) => {
           
        },
        setCurrentLevel: (state, action) => {
            state.currentLevel = action.payload;
        },
        setProgressBar: (state, action) => {
            state.progressBar = action.payload;
        },
        setSelectedHero: (state, action) => {
            state.selectedHero = action.payload;
        },
        setNextLevel: (state, action) => {
            state.nextLevel = action.payload;
        },
    },
});

export const progressActions = progressSlice.actions;

export default progressSlice;
