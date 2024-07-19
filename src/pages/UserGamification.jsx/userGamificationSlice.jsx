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
    heroes: [
        // { id: 1, name: "Erik", icon: erik, icontb: eriktb, description: "the Viking" },
        // { id: 2, name: "Lola", icon: lola, icontb: lolatb, description: "the Carnival Queen" },
        // { id: 3, name: "Lee", icon: lee, icontb: leetb, description: "the Dragon Warrior" },
        // { id: 4, name: "Jack", icon: jack, icontb: jacktb, description: "the Jackaroo" },
        // { id: 5, name: "Sam", icon: sam, icontb: samtb, description: "the Eagle" },
        // { id: 6, name: "Nia", icon: "", icontb: "", description: "the Numbian Queen" },
    ],
    displayedHero: {},
    currentLevel: {},
    levels: null,
    selectedHero: {},
    heroLevels: null,
};

export const userGamificationSlice = createSlice({
    name: 'gamification',
    initialState,
    reducers: {
        // reset: (state) => {
        //    
        // },
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
    },
});

export const gamificationActions = userGamificationSlice.actions;

export default userGamificationSlice;
