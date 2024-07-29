import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    event: null,
    sports: null,
    selectedMarketCategory: null,
    selectedMarketCategoryIndex: null,
};

export const outrightsSlice = createSlice({
    name: 'outrights',
    initialState,
    reducers: {
        reset: (state) => {
            state.event = null;
            state.sports = null;
            state.selectedMarketCategory = null;
            state.selectedMarketCategoryIndex = null;
        },
        setEvent: (state, action) => {
            state.event = action.payload;
        },
        setSports: (state, action) => {
            state.sports = action.payload;
        },
        setSelectedMarketCategory: (state, action) => {
            state.selectedMarketCategory = action.payload;
        },
        setSelectedMarketCategoryIndex: (state, action) => {
            state.selectedMarketCategoryIndex = action.payload;
        },
    },
});

export const outrightsActions = outrightsSlice.actions;

export default outrightsSlice;
