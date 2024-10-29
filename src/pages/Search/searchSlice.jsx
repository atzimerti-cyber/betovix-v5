import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    moreLoading: false,
    casinoResults: null,
    sportsResults: null,
    notRenderedLiveResults: null,
    searchString: '',
    searchSelectedProviders: [],
    lobbySearchString: '',
};

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false;
            state.moreLoading = false;
            state.casinoResults = null;
            state.notRenderedLiveResults = null;
            state.searchString = '';
            state.searchSelectedProviders = [];
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setMoreLoading: (state, action) => {
            state.moreLoading = action.payload;
        },
        setCasinoResults: (state, action) => {
            state.casinoResults = action.payload;
        },
        setSportsResults: (state, action) => {
            state.sportsResults = action.payload;
        },
        setSearchString: (state, action) => {
            state.searchString = action.payload;
        },
        addToCasinoResults: (state, action) => {
            state.casinoResults.Data = [...state.casinoResults.Data, ...action.payload.Data];
            state.casinoResults.Total = action.payload.Total;
            state.casinoResults.casinoSearchPage = action.payload.casinoSearchPage;
            state.casinoResults.casinoGamesAdded = action.payload.casinoGamesAdded;
            state.casinoResults.providers = action.payload.providers;
        },
        setNotRenderedLiveResults: (state, action) => {
            state.notRenderedLiveResults = action.payload;
        },
        setSearchSelectedProviders: (state, action) => {
            state.searchSelectedProviders = action.payload;
        },
        setLobbySearchString: (state, action) => {
            state.lobbySearchString = action.payload;
        },
    },
});

export const searchActions = searchSlice.actions;

export default searchSlice;
