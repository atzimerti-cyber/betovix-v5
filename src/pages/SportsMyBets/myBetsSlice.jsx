import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ticketsTable: null,
    ticketsLoading: false,
    ticketCashouts: null,
    hasTicketCashouts: false,
    cashedOutResult: {},
};

export const myBetsSlice = createSlice({
    name: 'myBets',
    initialState,
    reducers: {
        reset: (state) => {
            state.ticketsTable = null;
            state.ticketsLoading = false;
            state.ticketCashouts = null;
            state.hasTicketCashouts = false;
            state.cashedOutResult = {};
        },
        setTicketsTable: (state, action) => {
            state.ticketsTable = action.payload;
        },
        setTicketsLoading: (state, action) => {
            state.ticketsLoading = action.payload;
        },
        setTicketCashouts: (state, action) => {
            let tc = {};

            action.payload.tickets?.forEach((ticketCashout) => {
                const ticketId = ticketCashout.Ticket.TicketId;
                tc[ticketId] = ticketCashout;
            });

            if (action.payload.tickets.length) {
                state.ticketCashouts = tc;
                state.hasTicketCashouts = true;
            } else {
                state.ticketCashouts = null;
                state.hasTicketCashouts = false;
            }
        },
        setHasTicketsCashouts: (state, action) => {
            state.hasTicketCashouts = action.payload;
        },
        setCashedOutResult: (state, action) => {
            state.cashedOutResult = action.payload;
        },
        updateCashedOutResult: (state, action) => {
            state.cashedOutResult[action.payload.ticketId] = action.payload.value;
        },
        deleteCashedOutResult: (state, action) => {
            delete state.cashedOutResult[action.payload];
        },
    },
});

export const myBetsActions = myBetsSlice.actions;

export default myBetsSlice;
