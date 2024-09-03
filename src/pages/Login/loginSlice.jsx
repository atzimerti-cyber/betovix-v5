import { createSlice, current } from '@reduxjs/toolkit';

import { removeTokens } from '../../utils/auth';

const initialState = {
    user: null,
    loginLoading: false,
    updateLoading: false,
    accountChildren: [],
    selectedAccount: null,
    recoverId: null,
    emailSent: false,

    permissions: {
        AllowToBomba: false,
        AllowToCasino: true,
        AllowToHistory: false,
        AllowToJackpots: false,
        AllowToSlots: true,
        AllowToSports: true,
    },
    notLoggedInPermissions: {
        AllowToBomba: false,
        AllowToCasino: true,
        AllowToHistory: false,
        AllowToJackpots: false,
        AllowToSlots: true,
        AllowToSports: true,
    },
};

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.permissions = action.payload.MyPermissions;
        },
        logout: (state) => {
            state.user = null;
            // const currentNotLoggedInPermissions = current(state.notLoggedInPermissions);
            state.permissions = state.notLoggedInPermissions;
            state.accountChildren = [];
            state.selectedAccount = null;
            removeTokens();
        },
        setLoginLoading: (state, action) => {
            state.loginLoading = action.payload;
        },
        setUpdateLoading: (state, action) => {
            state.updateLoading = action.payload;
        },
        setAccountChildren(state, action) {
            state.accountChildren = action.payload;
        },
        setSelectedAccount(state, action) { 
            state.selectedAccount = action.payload;
        },
        setRecoverAccountId(state, action) { 
            state.recoverId = action.payload;
        },
        setEmailSentCorrectly(state, action) { 
            state.emailSent = action.payload;
        },
    },
});


export const loginActions = loginSlice.actions;

export default loginSlice;
