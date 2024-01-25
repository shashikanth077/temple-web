import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    BookinSingleList, BookingTypeList,
} from 'models';

export interface BookingState {
    loading?: boolean;
    booking:any;
    bookings:any;
    message:string;
}

export interface BookingPayload {
    _id:string | undefined;
}

export interface BookingGetPayload {
    sevaBookingType:string;
}

const initialState: BookingState = {
    loading: false,
    booking: {},
    bookings: [],
    message: '',
};

const BookingSlice = createSlice({
    name: 'adminbookingtypes',
    initialState,
    reducers: {
        getBookingById(state, action: PayloadAction<BookingPayload>) {
            state.loading = true;
        },
        getBookingByIdSuccess(state, action: PayloadAction<BookinSingleList>) {
            state.loading = false;
            state.booking = action.payload.booking;
        },
        getBookingDetails(state, action: PayloadAction<BookingGetPayload>) {
            state.loading = true;
        },
        getBookingDetailsSuccess(state, action: PayloadAction<BookingTypeList>) {
            state.loading = false;
            state.bookings = action.payload.bookings;
        },
        addBooking(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        updateBooking(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        deleteBooking(state, action: PayloadAction<BookingPayload>) {
            state.loading = true;
        },
    },
});

// Actions
export const adminBookingActions = BookingSlice.actions;

// Reducer
export const adminBookingReducer = BookingSlice.reducer;
