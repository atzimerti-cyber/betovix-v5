import { createSlice } from '@reduxjs/toolkit';

import erik from '../../assets/heroes/Erik the Viking.jpg';
import jack from '../../assets/heroes/Jack the Jackaroo.jpg';
import lee from '../../assets/heroes/Lee the Dragon Warrior.jpg';
import lola from '../../assets/heroes/Lola the Carnival Queen.jpg';
import sam from '../../assets/heroes/Sam the Eagle.jpg';
import eriktb from '../../assets/heroes/erik-tb.png';
import jacktb from '../../assets/heroes/jack-tb.png';
import leetb from '../../assets/heroes/lee-tb.png';
import lolatb from '../../assets/heroes/lola-tb.png';
import samtb from '../../assets/heroes/sam-tb.png';

const initialState = {
    topGames: null,
    heroes: [
        { id: 1, name: "Erik", icon: erik, icontb: eriktb, description: "the Viking" },
        { id: 2, name: "Lola", icon: lola, icontb: lolatb, description: "the Carnival Queen" },
        { id: 3, name: "Lee", icon: lee, icontb: leetb, description: "the Dragon Warrior" },
        { id: 4, name: "Jack", icon: jack, icontb: jacktb, description: "the Jackaroo" },
        { id: 5, name: "Sam", icon: sam, icontb: samtb, description: "the Eagle" },
        { id: 6, name: "Nia", icon: "", icontb: "", description: "the Numbian" },
    ],
    heroLevels: [],
    selectedHero: { id: 1, name: "Erik", icon: erik, icontb: eriktb, description: "the Viking" },
    levels: null,

};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        reset: (state) => {
            state.topGames = null;
        },
        setTopGames: (state, action) => {
            state.topGames = action.payload;
        },
        setSelectedHero: (state, action) => {
            state.selectedHero = action.payload;
        },
        setLevels: (state, action) => {
            state.levels = action.payload;
        },
    },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
