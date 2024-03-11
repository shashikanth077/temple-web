import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    BookingRes, SevaBookData, SuccesResponse, OrderBookingHistoryRes, orderRequest,
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
        getOrders(state, action: PayloadAction<orderRequest>) {
            state.loading = false;
        },
        getOrderShopSuccess(state, action: PayloadAction<OrderBookingHistoryRes>) {
            state.loading = false;
            state.orders = action.payload.orders;
        },
        confirmPayment(state, action: PayloadAction<OrderBookingHistoryRes>) {
            state.loading = false;
        },
    },
});

// Actions
export const myBookingsActions = BookingSlice.actions;

// Reducer
export const BookingsReducer = BookingSlice.reducer;
