import { RootState } from 'storeConfig/store';

export const selectBookingsList = (state: RootState) => state.bookings.bookings;
