import { createSlice, current } from "@reduxjs/toolkit";
import _ from "lodash";

import { removeTokens } from "../../utils/auth";

const initialState = {
  user: null,
  loginLoading: false,
  updateLoading: false,
  accountChildren: [],
  selectedAccount: null,
  recoverId: null,
  usernameSent: false,
  tfaToken: null,

  permissions: {
    AllowToHistory: false,
    AllowToSlots: true,
    AllowToSports: true,

    AllowToRetail: false,
    AllowGamification: true,
    AllowToCasino: true,
    AllowToVerification: false,
  },
  notLoggedInPermissions: {
    AllowGamification: true,
    AllowToCasino: true,
    AllowToHistory: false,
    AllowToSlots: true,
    AllowToSports: true,
    AllowToVerification: false,
    AllowToRetail: false,
  },
  mailToVerify: null,
  strongPassword: true,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const currentUser = current(state)?.user;

      // To prevent unnecessary recalculations when the user is set
      if (!_.isEqual(action.payload, currentUser)) {
        state.user = action.payload;
        state.permissions = action.payload.MyPermissions;
      }
    },
    logout: (state) => {
      state.user = null;
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
    setUsernameSentCorrectly(state, action) {
      state.usernameSent = action.payload;
    },
    setMailToVerify(state, action) {
      state.mailToVerify = action.payload;
    },
    setPermissions(state, action) {
      state.permissions = action.payload;
    },
    setTFAtoken(state, action) {
      state.tfaToken = action.payload;
    },
    setStrongPassword(state, action) {
      state.strongPassword = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
