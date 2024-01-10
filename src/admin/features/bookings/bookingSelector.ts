import { RootState } from 'storeConfig/store';

export const selectBookings = (state: RootState) => state.adminbookingtypes.bookings;
export const selectBooking = (state: RootState) => state.adminbookingtypes.booking;
