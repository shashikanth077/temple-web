import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { About, ListResponse } from 'models';

export interface AboutState {
  loading: boolean;
  list: any;
}

const initialState: AboutState = {
    loading: false,
    list: [],
};

const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
        fetchAboutList(state) {
            state.loading = true;
        },
        fetchAboutListSuccess(state, action: PayloadAction<ListResponse<About>>) {
            state.loading = false;
            state.list = action.payload;
        },
        fetchAboutListFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            console.log(action);
        },
    },
});

// About Actions
export const AboutsActions = aboutSlice.actions;

// About Reducer
export const AboutReducer = aboutSlice.reducer;
