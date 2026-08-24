import { createSlice, current } from "@reduxjs/toolkit";
import _ from "lodash";

import { removeTokens } from "../../utils/auth";
import { normalizePermissions } from "../../utils/siteSettings";

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
  sitePermissions: null,
  mailToVerify: null,
  strongPassword: true,
  idRequired: false,
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
        // Permissions now come primarily from Site/GetSiteSettings.
        // Keep them unless login/State explicitly returns MyPermissions.
        if (action.payload?.MyPermissions && typeof action.payload.MyPermissions === "object") {
          state.permissions = normalizePermissions(
            action.payload.MyPermissions,
            state.permissions
          );
        }
      }
    },
    logout: (state) => {
      state.user = null;
      state.permissions = state.sitePermissions || state.notLoggedInPermissions;
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
      const normalized = normalizePermissions(action.payload);
      state.permissions = normalized;
      state.sitePermissions = normalized;
    },
    setTFAtoken(state, action) {
      state.tfaToken = action.payload;
    },
    setStrongPassword(state, action) {
      state.strongPassword = action.payload;
    },
    setIDRequired(state, action) {
      state.idRequired = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
