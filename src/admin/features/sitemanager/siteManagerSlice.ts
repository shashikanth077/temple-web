import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SiteSetting {
    Content:string;
    loading:boolean;
}

const initialState: SiteSetting = {
    loading: false,
    Content: '',
};

const SiteManagerSlice = createSlice({
    name: 'sitesettings',
    initialState,
    reducers: {
        getStatiContentDetails(state) {
            state.loading = true;
        },
        getStatiContentDetailsSuccess(state, action: PayloadAction<any>) {
            state.loading = false;
            state.Content = action.payload.Content;
        },
        uploadStaticData(state, action: PayloadAction<any>) {
            state.loading = false;
        },
    },
});

// Actions
export const adminSiteManagerActions = SiteManagerSlice.actions;

// Reducer
export const adminSiteManagerReducer = SiteManagerSlice.reducer;
