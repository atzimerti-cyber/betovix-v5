import { createSlice, current } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  casinoHome: null,
  lobbyCategories: null,
  casinoBanners: null,
  casinoVendors: null,
  topProviders: null,
  vendorGames: null,
  moreLoading: false,
  showCasinoGame: false,
  slotGames: null,
  liveGames: null,
  searchResults: null,
  searchHomeResults: null,
  searchLoading: false,
  searchHomeLoading: false,
  sorting: "Default",
  filteredGames: {},
  promotionCasino: null,
  casinoGame: null,
  casinoGameModal: null,
  casinoTags: null,
  casinoByTags: {},
  gameOptionsModal: null,
  promotions: null,
  loadMoreSuccess: true,
  selectedGame: null,
  playerStats: [],
  casinoLandMenu: null,
  initialResultsCount: null,
};

const updateFavoriteInCollection = (collection, gameId, value) => {
  const games = Array.isArray(collection) ? collection : collection?.Data;
  if (!Array.isArray(games)) return;
  games.forEach((game) => {
    const id = game?.gameId ?? game?.Id ?? game?.Data?.Id;
    if (String(id) === String(gameId)) {
      game.isFav = value;
      game.isFavorite = value;
    }
  });
};

export const casinoSlice = createSlice({
  name: "casino",
  initialState,
  reducers: {
    reset: (state) => {
      Object.assign(state, _.cloneDeep(initialState));
    },
    resetLobby: (state) => {
      state.casinoHome = null;
      state.lobbyCategories = null;
      state.casinoBanners = null;
      state.casinoVendors = null;
      state.topProviders = null;
      state.casinoByTags = {};
    },
    resetSlots: (state) => {
      state.slotGames = null;
      state.liveGames = null;
      state.searchResults = null;
      state.moreLoading = false;
      state.searchLoading = false;
      state.sorting = "Default";
      state.casinoVendors = null;
      state.casinoByTags = {};
      state.filteredGames = {};
    },
    setCasinoHome: (state, action) => { state.casinoHome = action.payload; },
    setLobbyCategories: (state, action) => { state.lobbyCategories = action.payload; },
    setCasinoBanners: (state, action) => { state.casinoBanners = action.payload; },
    setCasinoVendors: (state, action) => { state.casinoVendors = action.payload; },
    setTopProviders: (state, action) => { state.topProviders = action.payload; },
    addToVendorGames: (state, action) => {
      if (!state.vendorGames) state.vendorGames = { Data: [] };
      state.vendorGames.Data = [...(state.vendorGames.Data || []), ...action.payload];
    },
    setVendorGames: (state, action) => { state.vendorGames = action.payload; },
    setMoreLoading: (state, action) => { state.moreLoading = action.payload; },
    setCasinoGame: (state, action) => { state.casinoGame = action.payload; },
    setShowCasinoGame: (state, action) => { state.showCasinoGame = action.payload; },
    setCasinoGameModal: (state, action) => { state.casinoGameModal = action.payload; },
    setSlotGames: (state, action) => { state.slotGames = action.payload; },
    addToAllSlots: (state, action) => {
      if (!state.slotGames) state.slotGames = { Data: [] };
      state.slotGames.Data = [...(state.slotGames.Data || []), ...(action.payload.Data || [])];
      Object.assign(state.slotGames, action.payload, { Data: state.slotGames.Data });
    },
    setLiveGames: (state, action) => { state.liveGames = action.payload; },
    addToAllLives: (state, action) => {
      if (!state.liveGames) state.liveGames = { Data: [] };
      state.liveGames.Data = [...(state.liveGames.Data || []), ...(action.payload.Data || [])];
      Object.assign(state.liveGames, action.payload, { Data: state.liveGames.Data });
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      if (state.initialResultsCount == null && action.payload?.Total != null) state.initialResultsCount = action.payload.Total;
    },
    setInitialResultsCount: (state, action) => { state.initialResultsCount = action.payload; },
    setSearchHomeResults: (state, action) => { state.searchHomeResults = action.payload; },
    addToSearchResults: (state, action) => {
      if (!state.searchResults) state.searchResults = { Data: [] };
      state.searchResults.Data = [...(state.searchResults.Data || []), ...(action.payload?.Data || [])];
    },
    addToSearchHomeResults: (state, action) => {
      if (!state.searchHomeResults) state.searchHomeResults = { Data: [] };
      state.searchHomeResults.Data = [...(state.searchHomeResults.Data || []), ...(action.payload?.Data || [])];
    },
    setSearchLoading: (state, action) => { state.searchLoading = action.payload; },
    setSearchHomeLoading: (state, action) => { state.searchHomeLoading = action.payload; },
    setSorting: (state, action) => { state.sorting = action.payload; },
    setFilteredGames: (state, action) => { state.filteredGames = action.payload || {}; },
    addToFilteredGames: (state, action) => {
      const bucket = state.filteredGames?.[action.payload.property];
      if (!bucket) return;
      bucket.Data = [...(bucket.Data || []), ...(action.payload.values || [])];
      if (bucket.filter) bucket.filter.Page = Number(bucket.filter.Page || 1) + 1;
    },
    loadMoreFilteredGames: (state, action) => {
      if (!state.filteredGames?.Data) state.filteredGames = { ...state.filteredGames, Data: [] };
      state.filteredGames.Data = [...state.filteredGames.Data, ...(action.payload.Data || [])];
      Object.assign(state.filteredGames, action.payload, { Data: state.filteredGames.Data });
    },
    addFavorite: (state, action) => {
      const updated = _.cloneDeep(current(state).filteredGames || {});
      Object.values(updated).forEach((collection) => updateFavoriteInCollection(collection, action.payload, true));
      state.filteredGames = updated;
      updateFavoriteInCollection(state.casinoHome, action.payload, true);
      if (state.casinoGameModal) updateFavoriteInCollection([state.casinoGameModal], action.payload, true);
    },
    removeFavorite: (state, action) => {
      const updated = _.cloneDeep(current(state).filteredGames || {});
      Object.values(updated).forEach((collection) => updateFavoriteInCollection(collection, action.payload, false));
      state.filteredGames = updated;
      if (state.casinoGameModal) updateFavoriteInCollection([state.casinoGameModal], action.payload, false);
    },
    setPromotionCasino: (state, action) => { state.promotionCasino = action.payload; },
    setCasinoTags: (state, action) => { state.casinoTags = action.payload; },
    setCasinoByTags: (state, action) => { state.casinoByTags[action.payload.Tag] = action.payload.Contents; },
    addToCasinoByTags: (state, action) => {
      const tag = action.payload.Tag;
      const currentTag = state.casinoByTags[tag];
      if (Array.isArray(currentTag)) state.casinoByTags[tag] = [...currentTag, ...(action.payload.Contents || [])];
      else if (currentTag?.Data) currentTag.Data = [...currentTag.Data, ...(action.payload.Contents || [])];
    },
    setGameOptionsModal: (state, action) => { state.gameOptionsModal = action.payload; },
    setPromotions: (state, action) => { state.promotions = action.payload; },
    loadMoreSuccess: (state, action) => { state.loadMoreSuccess = action.payload; },
    setSelectedGame: (state, action) => { state.selectedGame = action.payload; },
    setPlayerStats: (state, action) => { state.playerStats = action.payload || []; },
    setCasinoLandMenu: (state, action) => { state.casinoLandMenu = action.payload; },
  },
});

export const casinoActions = casinoSlice.actions;
export default casinoSlice;
