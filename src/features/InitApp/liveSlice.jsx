import { createSlice, current } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
    liveState: null,
    liveConnection: null,
    incompleteDataEvents: {},
    addedRemovedEvent: 0,
};

export const liveSlice = createSlice({
    name: 'live',
    initialState,
    reducers: {
        setLiveState: (state, action) => {
            state.liveState = action.payload;
            state.addedRemovedEvent = 1;
        },
        setLiveConnection: (state, action) => {
            state.liveConnection = action.payload;
        },
        updateLiveHeader: (state, action) => {
            const currentLive = current(state.liveState);

            const matchId = action.payload.MatchId;
            const previousHeader = { ...currentLive[matchId].Header };
            state.liveState[matchId].PreviousHeader = previousHeader;
            state.liveState[matchId].Header = action.payload;
        },
        updateHeadersProps: (state, action) => {
            const currentLive = current(state.liveState);

            const previousHeader = { ...currentLive[action.payload.matchId].Header };
            state.liveState[action.payload.matchId].PreviousHeader = previousHeader;
            state.liveState[action.payload.matchId].Header = action.payload.updatedHeader;
        },
        updateEventMarkets: (state, action) => {
            const currentLive = current(state.liveState);

            const matchId = action.payload.matchId;
            const previousMarkets = [...currentLive[matchId].Markets];
            state.liveState[matchId].PreviousMarkets = previousMarkets;
            state.liveState[matchId].Markets = action.payload.markets;
        },

        removeEvents: (state, action) => {
            action.payload.forEach((eventId) => {
                delete state.liveState[eventId];
            });

            if (action.payload.length) {
                state.addedRemovedEvent += 1; // Will trigger recalculation of some things
            }
        },
        addEvent: (state, action) => {
            const eventId = action.payload.MatchId;
            state.liveState[eventId] = action.payload;

            delete state.incompleteDataEvents[eventId];
            state.addedRemovedEvent += 1;
        },
        addIncomplete: (state, action) => {
            // Check that there are not any very old incomplete events
            const currentIncomplete = current(state.incompleteDataEvents);

            const now = new Date();
            const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

            Object.keys(currentIncomplete).forEach((key) => {
                const inc = currentIncomplete[key];
                const timeAdded = inc.addedOn;
                if (timeAdded < oneHourAgo) {
                    delete currentIncomplete[key];
                }
            });

            const eventId = action.payload.MatchId;
            state.incompleteDataEvents[eventId] = action.payload;
        },
        checkAlives: (state, action) => {
            const currentLive = current(state.liveState);

            const eventIdsSet = new Set(action.payload);

            //Remove matches not in Alive message. ? What happening to matches with active = false?
            for (const key in currentLive) {
                if (!eventIdsSet.has(Number(key))) {
                    delete state.liveState[Number(key)];

                    state.addedRemovedEvent += 1; // Will trigger recalculation of some things
                }
            }
        },
    },
});

export const liveActions = liveSlice.actions;

export default liveSlice;
