import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    banners: null,
};

export const bannersSlice = createSlice({
    name: 'banners',
    initialState,
    reducers: {
        reset: (state) => {
            state.banners = null;
        },
         
        setBanners: (state, action) => {
            state.banners = action.payload;
        },
        
    },
});

export const bannersActions = bannersSlice.actions;

export default bannersSlice;
