import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    levels: null,
    rewards: null,
    bonuses: null,
    loading: false,
    onCloseModal: null,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        reset: (state) => {
            state.levels = null;
            state.rewards = null;
            state.bonuses = null;
            state.loading = false;
            state.onCloseModal = null;
        },
        setLevels: (state, action) => {
            state.levels = action.payload;
        },
        setRewards: (state, action) => {
            state.rewards = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setOnCloseModal: (state, action) => {
            state.onCloseModal = action.payload;
        },  
        setBonuses(state, action) {
            state.bonuses = action.payload;
        },
        removeBonus(state, action) {
            state.bonuses = state.bonuses.filter(bonus => bonus.Id !== action.payload);
        },
    },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
