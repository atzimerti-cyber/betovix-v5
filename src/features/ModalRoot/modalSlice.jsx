import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  levels: null,
  rewards: null,
  bonuses: [],
  loading: false,
  onCloseModal: null,
  ticketToPrint: null,
  promoPage: null,
  transactions: null,
  inLobbySearch: false,
  promoCodeSlug: null,
  promoCodePage: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    reset: (state) => {
      state.levels = null;
      state.rewards = null;
      state.bonuses = [];
      state.loading = false;
      state.ticketToPrint = null;
      state.onCloseModal = null;
      state.promoPage = null;
      state.transactions = null;
      state.promoCodeSlug = null;
      state.promoCodePage = null;
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
    setTransactions(state, action) {
      state.transactions = action.payload;
    },
    setTicket(state, action) {
      state.ticketToPrint = action.payload;
    },
    setPromoPage(state, action) {
      state.promoPage = action.payload;
    },
    setPromoCodePage(state, action) {
      state.promoCodePage = action.payload;
    },
    setPromoCodeSlug(state, action) {
      state.promoCodeSlug = action.payload;
    },
    setInLobbySearch: (state, action) => {
      state.inLobbySearch = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
