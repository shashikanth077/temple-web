import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServerList, ServiceBookData, SuccesResponse } from 'models';

export interface ServiceState {
  loading: boolean;
  services:any;
  message:string;
  bookingData:any;
}
interface GetBookingPayload {
    _id:string | undefined;
}
const initialState: ServiceState = {
    loading: false,
    services: [],
    message: '',
    bookingData: {},
};

const serviceSlice = createSlice({
    name: 'pbservices',
    initialState,
    reducers: {
        getServices(state, action: PayloadAction<GetBookingPayload>) {
            state.loading = true;
        },
        fetchServiceListSuccess(state, action: PayloadAction<ServerList>) {
            state.loading = false;
            state.services = action.payload.services;
        },
    },
});

// Service Actions
export const serviceActions = serviceSlice.actions;

// Service Reducer
export const serviceReducer = serviceSlice.reducer;
