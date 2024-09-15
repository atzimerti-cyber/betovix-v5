import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    topGames: null,
    heroes: null,
    displayedHero: {},
    currentLevel: {},
    levels: null,
    selectedHero: null,
    heroLevels: null,
    popupRewards: { Id: 1 },
    newRewards: [],
    claimedRewards: [],
    loading: false,
    progressBar: null,
    manualRewards: {
        instantRewards:null,
        dailyRewards:null,
        weeklyRewards:null,
        monthlyRewards:null,
    },
    dataCame:null,
    ericLevels: {},
    nextLevel: {},
    selectedHeroError: true,
};

export const userGamificationSlice = createSlice({
    name: 'gamification',
    initialState,
    reducers: {
        reset: (state) => {
           
        },
        setHeroes: (state, action) => {
            state.heroes = action.payload;
        },
        setDisplayedHero: (state, action) => {
            state.displayedHero = action.payload;
        },
        setSelectedHero: (state, action) => {
            state.selectedHero = action.payload;
        },
        setCurrentLevel: (state, action) => {
            state.currentLevel = action.payload;
        },
        setHeroLevels: (state, action) => {
            state.heroLevels = action.payload;
        },
        setPopupRewards: (state, action) => {
            state.popupRewards = action.payload;
        },
        setNewRewards: (state, action) => {
            state.newRewards = action.payload;
        },
        setClaimedRewards: (state, action) => {
            state.claimedRewards = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProgressBar: (state, action) => {
            state.progressBar = action.payload;
        },
        setManualRewards: (state, action) => {
            state.dataCame = true;
            state.manualRewards = action.payload;
        },
        setEricLevels: (state, action) => {
            state.ericLevels = action.payload;
        },
        setNextLevel: (state, action) => {
            state.nextLevel = action.payload;
        },
        setSelectedHeroError: (state, action) => {
            state.selectedHeroError = action.payload;
        },
    },
});

export const gamificationActions = userGamificationSlice.actions;

export default userGamificationSlice;
