import { RootState } from 'storeConfig/store';

export const selectBookingsList = (state: RootState) => state.member.bookings.mybookings;
export const selectSevaList = (state: RootState) => state.member.bookings.bookings;
export const selecLocalSevaData = (state: RootState) => state.member.bookings.sevaData;
export const selectOrderHistry = (state: RootState) => state.member.bookings.orders;
