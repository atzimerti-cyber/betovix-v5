import { createSlice } from '@reduxjs/toolkit';

import { setLeftbar, setRightbar } from '../../utils/storage';

const initialState = {
    isMediumWidth: 1000,
    isLargeWidth: 1200,
    initLoading: false,
    loading: false,
    partLoading: false,
    showRightContainer: false,
    showRight: 'betslip',
    fullLeftContainer: true,
    userDropdownVisible: false,
    pageNotAuthorized: false,
    scrollToTop: 1,
    showLiveListContainer: false,
};

export const layoutSlice = createSlice({
    name: 'layout',
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
        setPageNotAuthorized: (state, action) => {
            state.pageNotAuthorized = action.payload;
        },
        setScrollToTop: (state) => {
            state.scrollToTop += 1;
        },
        setShowLiveListContainer: (state, action) => {
            state.showLiveListContainer = action.payload;
        },
    },
});

export const layoutActions = layoutSlice.actions;

export default layoutSlice;
