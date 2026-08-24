import { createSlice, current } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = { casinoFavs: [] };

const updateFavorite = (state, gameId, value) => {
  const updated = _.cloneDeep(current(state).casinoFavs || []);
  const visit = (collection) => {
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
  if (Array.isArray(updated)) visit(updated);
  else Object.values(updated || {}).forEach(visit);
  state.casinoFavs = updated;
};

export const casinoFavoritesSlice = createSlice({
  name: "casinoFavorites",
  initialState,
  reducers: {
    reset: (state) => { state.casinoFavs = []; },
    setCasinoFavs: (state, action) => { state.casinoFavs = action.payload || []; },
    addToCasinoFavs: (state, action) => {
      const bucket = state.casinoFavs?.[action.payload.property];
      if (!bucket) return;
      bucket.Data = [...(bucket.Data || []), ...(action.payload.values || [])];
      if (bucket.filter) bucket.filter.Page = Number(bucket.filter.Page || 1) + 1;
    },
    addCasinoFavorite: (state, action) => updateFavorite(state, action.payload, true),
    removeCasinoFavorite: (state, action) => updateFavorite(state, action.payload, false),
  },
});

export const casinoFavoritesActions = casinoFavoritesSlice.actions;
export default casinoFavoritesSlice;
