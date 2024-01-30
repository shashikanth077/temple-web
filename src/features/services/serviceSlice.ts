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
    name: 'services',
    initialState,
    reducers: {
        getServices(state, action: PayloadAction<GetBookingPayload>) {
            state.loading = true;
        },
        fetchServiceListSuccess(state, action: PayloadAction<ServerList>) {
            state.loading = false;
            state.services = action.payload.services;
        },
        bookService(state, action: PayloadAction<ServiceBookData>) {
            state.loading = false;
        },
        saveBookingLocalData(state, action: PayloadAction<SuccesResponse>) {
            state.loading = false;
            state.bookingData = action.payload;
        },
        confirmPayment(state, action: PayloadAction<ServiceBookData>) {
            state.loading = false;
        },
        bookServiceSuccess(state, action: PayloadAction<SuccesResponse>) {
            state.loading = false;
            state.message = action.payload.message;
        },
    },
});

// Service Actions
export const serviceActions = serviceSlice.actions;

// Service Reducer
export const serviceReducer = serviceSlice.reducer;
