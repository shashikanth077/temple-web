import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    AdminService, SuccessRes, ServerList, ServerSingleList,
} from 'models';

export interface ServiceState {
    loading?: boolean;
    service:any;
    services:any;
    message:string;
}

export interface ServicePayload {
    _id:string | undefined;
}

const initialState: ServiceState = {
    loading: false,
    service: {},
    services: [],
    message: '',
};

const ServiceSlice = createSlice({
    name: 'adminService',
    initialState,
    reducers: {
        getServiceById(state, action: PayloadAction<ServicePayload>) {
            state.loading = true;
        },
        getServiceByIdSuccess(state, action: PayloadAction<ServerSingleList>) {
            state.loading = false;
            state.service = action.payload.service;
        },
        getServiceDetails(state) {
            state.loading = true;
        },
        getServiceDetailsSuccess(state, action: PayloadAction<ServerList>) {
            state.loading = false;
            state.services = action.payload.services;
        },
        addService(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        updateService(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        deleteService(state, action: PayloadAction<ServicePayload>) {
            state.loading = true;
        },
    },
});

// Actions
export const adminServiceActions = ServiceSlice.actions;

// Reducer
export const adminServiceReducer = ServiceSlice.reducer;
