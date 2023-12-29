import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingRes } from 'models';

export interface BookingState {
    loading?: boolean;
    booking:any;
    bookings:any;
    message:string;
}

interface GetBookingPayload {
    userid:string | undefined;
}
const initialState: BookingState = {
    loading: false,
    booking: {},
    bookings: [],
    message: '',
};

const BookingSlice = createSlice({
    name: 'mybookings',
    initialState,
    reducers: {
        getBookings(state, action: PayloadAction<GetBookingPayload>) {
            state.loading = true;
        },
        getBookingsSuccess(state, action: PayloadAction<BookingRes>) {
            state.loading = false;
            state.bookings = action.payload.bookings;
        },
    },
});

// Actions
export const myBookingsActions = BookingSlice.actions;

// Reducer
export const myBookingsReducer = BookingSlice.reducer;
