import { RootState } from 'storeConfig/store';

export const selectBookingsList = (state: RootState) => state.bookings.mybookings;
export const selectSevaList = (state: RootState) => state.bookings.bookings;
