import { createSlice } from "@reduxjs/toolkit";

import { setLeftbar, setRightbar } from "../../utils/storage";

const initialState = {
  isMediumWidth: 1000,
  isLargeWidth: 1200,
  initLoading: false,
  loading: false,
  partLoading: false,
  showRightContainer: false,
  showRight: "betslip",
  fullLeftContainer: true,
  userDropdownVisible: false,
  notificationDropdownVisible: false,
  pageNotAuthorized: false,
  scrollToTop: 1,
  showLiveListContainer: false,
  availableBonus: 0,
  footer: {},
  // tawkToScript: null,
  notifications: null,
  newNotifications: null,
  selectedNotification: null,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setInitLoading: (state, action) => {
      state.initLoading = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPartLoading: (state, action) => {
      state.partLoading = action.payload;
    },
    setShowRightContainer: (state, action) => {
      state.showRightContainer = action.payload;
      setRightbar(action.payload);
    },
    setShowRight: (state, action) => {
      state.showRight = action.payload;
    },
    setFullLeftContainer: (state, action) => {
      state.fullLeftContainer = action.payload;
      setLeftbar(action.payload);
    },
    setUserDropdownVisible: (state, action) => {
      state.userDropdownVisible = action.payload;
    },
    setNotificationDropdownVisible: (state, action) => {
      state.notificationDropdownVisible = action.payload;
    },
    setPageNotAuthorized: (state, action) => {
      state.pageNotAuthorized = action.payload;
    },
    setScrollToTop: (state) => {
      state.scrollToTop += 1;
    },
    setShowLiveListContainer: (state, action) => {
      state.showLiveListContainer = action.payload;
    },
    setAvailableBonus: (state, action) => {
      state.availableBonus = action.payload.AvailableBonusCount;
    },
    setAvailableBonusBalance: (state, action) => {
      state.bonusBalance = action.payload.TotalBonusBalance;
    },
    setFooter: (state, action) => {
      state.footer = action.payload;
    },
    // setTawkToScript: (state, action) => {
    //   state.tawkToScript = action.payload;
    // },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.newNotifications = action.payload.filter(
        (notification) => !notification.viewed
      );
    },

    setSelectedNotification: (state, action) => {
      state.selectedNotification = action.payload;
    },
  },
});

export const layoutActions = layoutSlice.actions;

export default layoutSlice;
