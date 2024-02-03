import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingRes, SevaBookData, SuccesResponse } from 'models';

export interface BookingState {
    loading?: boolean;
    booking:any;
    bookings:any;
    message:string;
    mybookings:any;
    sevaData:any;
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
            state.mybookings = action.payload.bookings;
        },
        getSevaList(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        getSevaListSuccess(state, action: PayloadAction<BookingRes>) {
            state.loading = false;
            state.bookings = action.payload.bookings;
        },
        bookSeva(state, action: PayloadAction<SevaBookData>) {
            state.loading = false;
        },
        saveSevaLocalData(state, action: PayloadAction<SuccesResponse>) {
            state.loading = false;
            state.sevaData = action.payload;
        },
    },
});

// Actions
export const myBookingsActions = BookingSlice.actions;

// Reducer
export const myBookingsReducer = BookingSlice.reducer;
