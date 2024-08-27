import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    slips: [],
    amounts: {},
    betslip: {
        totalStake: 0,
        totalPayout: 0,
        totalMultiplier: 0,
        slipsNum: 0,
    },
    betType: 'Single',
    betError: null,
    slipUpdated: 0,
    showReceiptFor: null,
    ticketId: null,
    placingBetLoading: false,
    savingBetLoading: false,
    lastBooked: null,
    totalStake: null,
    triggerPlaceBet: false
};

export const betslipSlice = createSlice({
    name: 'betslip',
    initialState,
    reducers: {
        reset: (state) => {
            state.slips = [];
            state.betslip = {
                totalStake: 0,
                totalPayout: 0,
                totalMultiplier: 0,
                slipsNum: 0,
            };
            state.betType = 'Single';
            state.betError = null;
            state.totalStake = null;
        },
        resetSlips: (state) => {
            state.slips = [];
        },
        setSlips: (state, action) => {
            state.slips = action.payload;
        },
        addToSlips: (state, action) => {
            state.slips.push(action.payload);
        },
        updateSlipAmount: (state, action) => {
            state.slips[action.payload.index].amount = action.payload.value;
        },
        updateSlipOdds: (state, action) => {
            const currentSlips = current(state.slips);
            const foundIndex = state.slips.findIndex((s) => s.FieldId === action.payload.fieldId);

            if (action.payload.newOdd !== state.slips[foundIndex].Odd) {
                state.slips[foundIndex].previousOdds = currentSlips[foundIndex].Odd;
                state.slips[foundIndex].Odd = action.payload.newOdd;
                state.slips[foundIndex].changed = true;
                state.slipUpdated += 1;
            }
        },

        updateLiveSlipOdds: (state, action) => {
            const currentSlips = current(state.slips);
            const foundMatch = state.slips.filter((s) => s.MatchId === action.payload.matchId);

            if (foundMatch.length) {
                let fieldValues = {};
                let fieldActives = {};
                action.payload.markets.forEach((market) => {
                    market.MarketFields.forEach((mf) => {
                        fieldValues[mf.FieldId] = mf.Value;
                        fieldActives[mf.FieldId] = market.Active && mf.Active ? true : false;
                    });
                });

                state.slips.forEach((slip, index) => {
                    const fieldId = slip.FieldId;
                    const matchId = slip.MatchId;
                    if (matchId === action.payload.matchId && action.payload.markets.length === 0) {
                        state.slips[index].Active = false;
                        state.slips[index].Odd = 0;
                        state.slipUpdated += 1;
                        return;
                    }

                    if (fieldValues[fieldId]) {
                        state.slips[index].previousOdds = currentSlips[index].Odd;
                        state.slips[index].Odd = fieldValues[fieldId];
                        state.slips[index].changed = true;
                        state.slips[index].Active = fieldActives[fieldId];
                        state.slipUpdated += 1;
                    }
                });
            }
        },

        setAmounts: (state, action) => {
            state.amounts = action.payload;
        },
        updateAmount: (state, action) => {
            state.amounts[action.payload.key] = action.payload.value;
            state.slipUpdated += 1;
        },
        removeFromSlips: (state, action) => {
            const foundIndex = state.slips.findIndex((s) => s.FieldId === action.payload);
            if (foundIndex > -1) {
                state.slips.splice(foundIndex, 1);

                // Remove amounts
                if (state.amounts[action.payload] !== undefined) delete state.amounts[action.payload];
                if (state.betType === 'System') {
                    const uniqueMatchIds = new Set(state.slips.map((item) => item.MatchId));
                    const uniqueCount = uniqueMatchIds.size;
                    if (state.amounts[uniqueCount + 1] !== undefined) delete state.amounts[uniqueCount + 1];
                }
            }
        },
        setBetslip: (state, action) => {
            state.betslip = action.payload;
        },
        setBetType: (state, action) => {
            state.betType = action.payload;
        },
        setBetError: (state, action) => {
            state.betError = action.payload;
        },
        acceptChanges: (state) => {
            state.slips.forEach((slip) => {
                delete slip.changed;
            });
            state.slipUpdated += 1;
        },
        setShowReceiptFor: (state, action) => {
            state.showReceiptFor = action.payload;
        },
        setPlacingBetLoading: (state, action) => {
            state.placingBetLoading = action.payload;
        },
        setSavingBetLoading: (state, action) => {
            state.savingBetLoading = action.payload;
        },
        setLastBookedBet: (state, action) => {
            state.lastBooked = action.payload;
        }, 
        setTotalStake: (state, action) => {
            state.totalStake = action.payload;
        },
        setTicketId: (state, action) => {
            state.ticketId = action.payload;
        },
        setTriggerPlaceBet(state, action) {
            state.triggerPlaceBet = action.payload;
        },
    },
});

export const betslipActions = betslipSlice.actions;

export default betslipSlice;
