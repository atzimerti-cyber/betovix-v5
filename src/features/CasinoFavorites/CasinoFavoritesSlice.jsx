import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    casinoFavs: null,
};

export const casinoFavoritesSlice = createSlice({
    name: 'casinoFavorites',
    initialState,
    reducers: {
        reset: (state) => {
            state.casinoFavs = null;
        },

        setCasinoFavs: (state, action) => {
            state.casinoFavs = action.payload;
        },
        addToCasinoFavs: (state, action) => {
            state.casinoFavs[action.payload.property].Data = [...state.casinoFavs[action.payload.property].Data, ...action.payload.values];
            state.casinoFavs[action.payload.property].filter.Page = state.casinoFavs[action.payload.property].filter.Page + 1;
        },
        addCasinoFavorite: (state, action) => {
            const currentState = current(state);
            const updated = _.cloneDeep(currentState.casinoFavs);

            for (const key in updated) {
                for (let i = 0; i < updated[key].Data.length; i++) {
                    if (updated[key].Data[i].Data.Id === action.payload) {
                        updated[key].Data[i].isFav = true;
                        break;
                    }
                }
            }

            state.casinoFavs = updated;
        },
        removeCasinoFavorite: (state, action) => {
            const currentState = current(state);
            const updated = _.cloneDeep(currentState.casinoFavs);

            for (const key in updated) {
                for (let i = 0; i < updated[key].Data.length; i++) {
                    if (updated[key].Data[i].Data.Id === action.payload) {
                        updated[key].Data[i].isFav = false;
                        break;
                    }
                }
            }
            state.casinoFavs = updated;
        },

    },
});

export const casinoFavoritesActions = casinoFavoritesSlice.actions;

export default casinoFavoritesSlice;
