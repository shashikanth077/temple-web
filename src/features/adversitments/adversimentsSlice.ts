import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Adversiments, ListResponse } from '../../models';

export interface AdsState {
  loading: boolean;
  list: Adversiments[];
}

const initialState: AdsState = {
    loading: false,
    list: [],
};

const adsSlice = createSlice({
    name: 'adverstiments',
    initialState,
    reducers: {
        fetchAdsList(state) {
            state.loading = true;
        },
        fetchAdsListSuccess(state, action: PayloadAction<ListResponse<Adversiments>>) {
            state.loading = false;
            state.list = action.payload.data;
        },
        fetchAdsListFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            console.log(action);
        },
    },
});

// Ads Actions
export const adsActions = adsSlice.actions;

// Ads Reducer
export const adsReducer = adsSlice.reducer;
