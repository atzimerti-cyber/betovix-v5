import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    casinoHome: null,
    casinoBanners: null,
    casinoVendors: null,
    vendorGames: null,
    moreLoading: false,
    showCasinoGame: false,
    slotGames: null,
    searchResults: null,
    searchLoading: true,
    sorting: 'Default Sort',
    filteredGames: {},
    promotionCasino: null,
    casinoGame: null,

    casinoTags: null,
    casinoByTags:{}
};

export const casinoSlice = createSlice({
    name: 'casino',
    initialState,
    reducers: {
        reset: (state) => {
            state.casinoHome = null;
            state.casinoBanners = null;
            state.casinoVendors = null;
            state.vendorGames = null;
            state.showCasinoGame = false;
            state.slotGames = null;
            state.searchResults = null;
            state.searchLoading = true;
            state.sorting = 'Default Sort';
            state.filteredGames = {};
            state.promotionCasino = null;
            state.casinoGame = null;
        },
        resetLobby: (state) => {
            state.casinoHome = null;
            state.casinoBanners = null;
            state.casinoVendors = null;
        },
        resetSlots: (state) => {
            state.slotGames = null;
            state.searchResults = null;
            state.moreLoading = false;
            state.searchLoading = false;
            state.sorting = 'Default Sort';
            state.casinoVendors = null;

            state.filteredGames = {};
        },
        setCasinoHome: (state, action) => {
            state.casinoHome = action.payload;
        },
        setCasinoBanners: (state, action) => {
            state.casinoBanners = action.payload;
        },
        setCasinoVendors: (state, action) => {
            state.casinoVendors = action.payload;
        },
        addToVendorGames: (state, action) => {
            state.vendorGames.Data = [...state.vendorGames.Data, ...action.payload];
        },
        setVendorGames: (state, action) => {
            state.vendorGames = action.payload;
        },
        setMoreLoading: (state, action) => {
            state.moreLoading = action.payload;
        },
        setCasinoGame: (state, action) => {
            state.casinoGame = action.payload;
        },
        setShowCasinoGame: (state, action) => {
            state.showCasinoGame = action.payload;
        },
        setSlotGames: (state, action) => {
            state.slotGames = action.payload;
        },
        addToAllSlots: (state, action) => {
            state.slotGames.allSlots.Data = [...state.slotGames.allSlots.Data, ...action.payload];
        },
        setSearchResults: (state, action) => {
            state.searchResults = action.payload;
        },
        setSearchLoading: (state, action) => {
            state.searchLoading = action.payload;
        },
        setSorting: (state, action) => {
            state.sorting = action.payload;
        },
        setFilteredGames: (state, action) => {
            state.filteredGames = action.payload;
        },
        addToFilteredGames: (state, action) => {
            state.filteredGames[action.payload.property].Data = [...state.filteredGames[action.payload.property].Data, ...action.payload.values];
            state.filteredGames[action.payload.property].filter.Page = state.filteredGames[action.payload.property].filter.Page + 1;
        },

        addFavorite: (state, action) => {
            const currentState = current(state);
            const updated = _.cloneDeep(currentState.filteredGames);

            for (const key in updated) {
                for (let i = 0; i < updated[key].Data.length; i++) {
                    if (updated[key].Data[i].Data.Id === action.payload) {
                        updated[key].Data[i].isFav = true;
                        break;
                    }
                }
            }

            state.filteredGames = updated;
        },
        removeFavorite: (state, action) => {
            const currentState = current(state);
            const updated = _.cloneDeep(currentState.filteredGames);

            for (const key in updated) {
                for (let i = 0; i < updated[key].Data.length; i++) {
                    if (updated[key].Data[i].Data.Id === action.payload) {
                        updated[key].Data[i].isFav = false;
                        break;
                    }
                }
            }
            state.filteredGames = updated;
        },
        setPromotionCasino: (state, action) => {
            state.promotionCasino = action.payload;
        },

        setCasinoTags: (state, action) => {
            state.casinoTags = action.payload;
        },
        setCasinoByTags: (state, action) => {
            let tag = action.payload.Tag;
            state.casinoByTags[tag] = action.payload.Contents;
        },
    },
});

export const casinoActions = casinoSlice.actions;

export default casinoSlice;
