import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ticketSettings: null,
    initTicket: {
        acceptChanges: true,
        combinations: [],
        hasChanges: false,
        metrics: {
            betAmount: 0,
            bettax: 0,
            bonusParoliCateg: 0,
            bonusParoliExtra: 0,
            finalWins: 0,
            grossWins: 0,
            maxWins: 0,
            netStake: 0,
            numberOfBets: 0,
            potentialWins: 0,
            totalPrice: 0,
            totaltax: 0,
            wintax: 0,
        },
        permutations: [],
        points: [],
        returns: {
            points: {},
            systems: {},
        },
        stakes: {
            netpoints: {},
            netsystems: {},
            points: {},
            systems: {},
            total: 0,
        },
        sumGrossPerMinApply: {},
        systemFactors: {},
        systems: {},
        systemsArr: [],
        type: null,
    },
    maxBet: null,
    calculateTicket: 0,
    ticketUpdated: 0,
    ticketChangesSettings: null,
};

export const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setTicketSettings: (state, action) => {
            state.ticketSettings = action.payload;
        },
        setMaxBet: (state, action) => {
            state.maxBet = action.payload;
            state.calculateTicket += 1;
        },
        setTicketChangesSettings: (state, action) => {
            state.ticketChangesSettings = action.payload;
        },
        setTicketUpdated: (state) => {
            state.ticketUpdated += 1;
        },
        setCalculateTicket: (state) => {
            state.calculateTicket += 1;
        },
    },
});

export const ticketActions = ticketSlice.actions;

export default ticketSlice;
