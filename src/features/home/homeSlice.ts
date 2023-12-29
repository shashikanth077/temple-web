import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Banner, ListResponse } from '../../models';

export interface BannerState {
  loading: boolean;
  list: Banner[];
}

const initialState: BannerState = {
    loading: false,
    list: [],
};

const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {
        fetchBannerList(state) {
            state.loading = true;
        },
        fetchBannerListSuccess(state, action: PayloadAction<ListResponse<Banner>>) {
            state.loading = false;
            state.list = action.payload.data;
        },
        fetchBannerListFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            console.log(action);
        },
    },
});

// Banner Actions
export const bannerActions = bannerSlice.actions;

// Banner Reducer
export const bannerReducer = bannerSlice.reducer;
