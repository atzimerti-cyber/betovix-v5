import { createSlice } from '@reduxjs/toolkit';

import erik from '../../assets/heroes/Erik Closeup.png';
import jack from '../../assets/heroes/Jack Closeup.png';
import lee from '../../assets/heroes/Lee Closeup.png';
import lola from '../../assets/heroes/Lola Closeup.png';
import sam from '../../assets/heroes/Sam Closeup.png';
import eriktb from '../../assets/heroes/erik-tb.png';
import jacktb from '../../assets/heroes/jack-tb.png';
import leetb from '../../assets/heroes/lee-tb.png';
import lolatb from '../../assets/heroes/lola-tb.png';
import samtb from '../../assets/heroes/sam-tb.png';

const initialState = {
    topGames: null,
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
    },
});

export const profileActions = profileSlice.actions;

export default profileSlice;
