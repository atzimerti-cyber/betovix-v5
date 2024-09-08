import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    casinoNew: null,
};

export const casinoNewSlice = createSlice({
    name: 'casinoNew',
    initialState,
    reducers: {
        reset: (state) => {
            state.casinoNew = null;
        },
         
        setCasinoNew: (state, action) => {
            state.casinoNew = action.payload;
        },
        
    },
});

export const casinoNewActions = casinoNewSlice.actions;

export default casinoNewSlice;
