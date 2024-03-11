import { RootState } from 'storeConfig/store';

// Banner Selectors
export const selectServiceLoading = (state: RootState) => state.member.services.loading;
export const selectServiceList = (state: RootState) => state.member.services.services;
export const selectBookServiceStatus = (state: RootState) => state.member.services.message;
export const selecLocalBookingData = (state: RootState) => state.member.services.bookingData;
