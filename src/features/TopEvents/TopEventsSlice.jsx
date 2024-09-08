import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    topEvents: null,
};

export const topEventsSlice = createSlice({
    name: 'topEvents',
    initialState,
    reducers: {
        reset: (state) => {
            state.topEvents = null;
        },
         
        setTopEvents: (state, action) => {
            state.topEvents = action.payload;
        },
        
    },
});

export const topEventsActions = topEventsSlice.actions;

export default topEventsSlice;
