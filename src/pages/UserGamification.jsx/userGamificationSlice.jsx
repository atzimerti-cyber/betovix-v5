import { createSlice } from '@reduxjs/toolkit';

// import erik from '../../assets/heroes/Erik Closeup.png';
// import jack from '../../assets/heroes/Jack Closeup.png';
// import lee from '../../assets/heroes/Lee Closeup.png';
// import lola from '../../assets/heroes/Lola Closeup.png';
// import sam from '../../assets/heroes/Sam Closeup.png';
// import eriktb from '../../assets/heroes/erik-tb.png';
// import jacktb from '../../assets/heroes/jack-tb.png';
// import leetb from '../../assets/heroes/lee-tb.png';
// import lolatb from '../../assets/heroes/lola-tb.png';
// import samtb from '../../assets/heroes/sam-tb.png';

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
    },
});

export const gamificationActions = userGamificationSlice.actions;

export default userGamificationSlice;
