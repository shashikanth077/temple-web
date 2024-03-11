import { RootState } from 'storeConfig/store';

export const selectBookings = (state: RootState) => state.admin.adminbookingtypes.bookings;
export const selectBooking = (state: RootState) => state.admin.adminbookingtypes.booking;
