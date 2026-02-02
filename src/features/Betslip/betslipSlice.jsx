import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  slips: [],
  amounts: {},
  betslip: {
    totalStake: 0,
    totalPayout: 0,
    totalMultiplier: 0,
    slipsNum: 0,
  },
  betType: "Single",
  betError: null,
  slipUpdated: 0,
  showReceiptFor: null,
  ticketId: null,
  placingBetLoading: false,
  savingBetLoading: false,
  lastBooked: null,
  totalStake: null,
  triggerPlaceBet: false,
  multiLocked: false,
  systemLocked: false,
  ticketToPrint: null,
  loading: null,
};

const removeSlipByFieldId = (state, fieldId) => {
  const foundIndex = state.slips.findIndex((s) => s.FieldId === fieldId);
  if (foundIndex > -1) {
    state.slips.splice(foundIndex, 1);

    if (state.amounts[fieldId] !== undefined) {
      delete state.amounts[fieldId];
    }

    if (state.betType === "System") {
      const uniqueMatchIds = new Set(state.slips.map((item) => item.MatchId));
      const uniqueCount = uniqueMatchIds.size;
      if (state.amounts[uniqueCount + 1] !== undefined) {
        delete state.amounts[uniqueCount + 1];
      }
    }

    state.slipUpdated += 1;
  }
};

export const betslipSlice = createSlice({
  name: "betslip",
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
      state.betType = "Single";
      state.betError = null;
      state.totalStake = null;
      state.loading = false;
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
    // addBBToSlips: (state, action) => {
    //   const { targetSlip, contents } = action.payload;

    //   const currentSlips = current(state.slips);

    //   const slipIndex = currentSlips.findIndex((s) => {
    //     return s.MarketTypeId == -10 && s.MatchId == targetSlip.MatchId;
    //   });

    addBBSlipToSlips: (state, action) => {
      const { found, responseData, market, marketField } = action.payload;

      if (!found || found.length === 0) return;

      const originalSlip = state.slips.find(
        (s) => s.FieldId === found[0].FieldId
      );
      if (!originalSlip) return;

      // Move ParentOdd and remove it
      originalSlip.Odd = responseData.Contents.ParentOdd;
      delete responseData.Contents.ParentOdd;

      // Push new BB to existing BB array
      if (!Array.isArray(originalSlip.BB)) {
        originalSlip.BB = [];
      }
      originalSlip.BB.push(responseData.Contents);

      state.slipUpdated += 1;
    },

    //   if (slipIndex != undefined) {
    //     let slip = currentSlips[slipIndex];

    //     state.slips[slipIndex].BB.push(contents);
    //     let a=1;
    //   }
    // },
    updateSlipAmount: (state, action) => {
      state.slips[action.payload.index].amount = action.payload.value;
    },
    updateSlipOdds: (state, action) => {
      const currentSlips = current(state.slips);

      if (!action.payload.isBB) {
        const foundIndex = state.slips.findIndex(
          (s) => s.FieldId === action.payload.fieldId
        );
        if (action.payload.newOdd !== state.slips[foundIndex].Odd) {
          state.slips[foundIndex].previousOdds = currentSlips[foundIndex].Odd;
          state.slips[foundIndex].Odd = action.payload.newOdd;
          state.slips[foundIndex].changed = true;
          state.slipUpdated += 1;
        }
      } else {
        state.slips.forEach((slip) => {
          if (slip.BB && slip.BB.length > 0) {
            const bbIndex = slip.BB.findIndex(
              (bbs) => bbs.FieldId === action.payload.bbFieldId
            );

            if (
              bbIndex !== -1 &&
              action.payload.newBBOdd !== slip.BB[bbIndex].Odd
            ) {
              const updatedBB = [...slip.BB];
              updatedBB[bbIndex] = {
                ...updatedBB[bbIndex],
                previousOdds: updatedBB[bbIndex].Odd,
                Odd: action.payload.newBBOdd,
                changed: true,
              };

              slip.BB = updatedBB;
              state.slipUpdated += 1;
            }
          }
        });
      }
    },

    updateLiveSlipOdds: (state, action) => {
      const currentSlips = current(state.slips);
      const foundMatch = state.slips.filter(
        (s) => s.MatchId === action.payload.matchId
      );

      if (foundMatch.length) {
        let fieldValues = {};
        let fieldActives = {};
        action.payload.markets.forEach((market) => {
          market.MarketFields.forEach((mf) => {
            fieldValues[mf.FieldId] = mf.Value;
            fieldActives[mf.FieldId] =
              market.Active && mf.Active ? true : false;
          });
        });

        state.slips.forEach((slip, index) => {
          const fieldId = slip.FieldId;
          const matchId = slip.MatchId;
          if (
            matchId === action.payload.matchId &&
            action.payload.markets.length === 0
          ) {
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
    // removeFromSlips: (state, action) => {
    //   const foundIndex = state.slips.findIndex(
    //     (s) => s.FieldId === action.payload
    //   );
    //   if (foundIndex > -1) {
    //     state.slips.splice(foundIndex, 1);

    //     // Remove amounts
    //     if (state.amounts[action.payload] !== undefined)
    //       delete state.amounts[action.payload];
    //     if (state.betType === "System") {
    //       const uniqueMatchIds = new Set(
    //         state.slips.map((item) => item.MatchId)
    //       );
    //       const uniqueCount = uniqueMatchIds.size;
    //       if (state.amounts[uniqueCount + 1] !== undefined)
    //         delete state.amounts[uniqueCount + 1];
    //     }
    //   }
    // },
    removeFromSlips: (state, action) => {
      removeSlipByFieldId(state, action.payload);
    },
    removeBBSlipFromSlips: (state, action) => {
      const { slipFId, bBSlipFId } = action.payload;

      const slip = state.slips.find((s) => s.FieldId === slipFId);

      if (slip && Array.isArray(slip.BB)) {
        slip.BB = slip.BB.filter((bbSlip) => bbSlip.FieldId !== bBSlipFId);

        if (slip.BB.length == 0) {
          removeSlipByFieldId(state, slipFId);
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
    setMultiLocked(state, action) {
      state.multiLocked = action.payload;
    },
    setSystemLocked(state, action) {
      state.systemLocked = action.payload;
    },
    setTicketToPrint(state, action) {
      state.ticketToPrint = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const betslipActions = betslipSlice.actions;

export default betslipSlice;
