import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    BookingRes,
} from 'models';

export interface BookingState {
    loading?: boolean;
    booking:any;
    bookings:any;
    message:string;
    mybookings:any;
    sevaData:any;
    orders:any;
}

interface GetBookingPayload {
    userid:string | undefined;
}
const initialState: BookingState = {
    loading: false,
    booking: {},
    sevaData: {},
    bookings: [],
    mybookings: [],
    message: '',
    orders: '',
};

const BookingSlice = createSlice({
    name: 'publicbookings',
    initialState,
    reducers: {
        getBookings(state, action: PayloadAction<GetBookingPayload>) {
            state.loading = true;
        },
        getBookingsSuccess(state, action: PayloadAction<BookingRes>) {
            state.loading = false;
            state.mybookings = action.payload.bookings;
        },
        getSevaList(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        getSevaListSuccess(state, action: PayloadAction<BookingRes>) {
            state.loading = false;
            state.bookings = action.payload.bookings;
        },
    },
});

// Actions
export const myBookingsActions = BookingSlice.actions;

// Reducer
export const BookingsReducer = BookingSlice.reducer;
