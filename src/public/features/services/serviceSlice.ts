import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ServerList, ServiceBookData, SuccesResponse } from 'models';

export interface ServiceState {
  loading: boolean;
  services:any;
  message:string;
  bookingData:any;
  allservices:any;
}
interface GetBookingPayload {
    _id:string | undefined;
}
const initialState: ServiceState = {
    loading: false,
    services: [],
    message: '',
    bookingData: {},
    allservices: [],
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
        getAllServices(state) {
            state.loading = true;
        },
        fetchAllServiceListSuccess(state, action: PayloadAction<ServerList>) {
            state.loading = false;
            state.allservices = action.payload.services;
        },
    },
});

// Service Actions
export const serviceActions = serviceSlice.actions;

// Service Reducer
export const serviceReducer = serviceSlice.reducer;
