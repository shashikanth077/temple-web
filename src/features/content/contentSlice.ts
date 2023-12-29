import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Content } from 'models';

export interface ContentState {
    loading?: boolean;
    services:any;
    shop:any;
    home:any;
    registration:any;
}

const initialState: ContentState = {
    loading: false,
    services: '',
    shop: '',
    home: '',
    registration: '',
};

const contentSlice = createSlice({
    name: 'staticcontent',
    initialState,
    reducers: {
        getStaticContent(state) {
            state.loading = true;
        },
        getStaticContentSuccess(state, action: PayloadAction<Content>) {
            state.services = action.payload.contentData.content.services;
            state.shop = action.payload.contentData.content.shop;
            state.home = action.payload.contentData.content.home;
            state.registration = action.payload.contentData.content.registration;
        },
    },
});

export const admincontentActions = contentSlice.actions;
export const admincontentReducer = contentSlice.reducer;
