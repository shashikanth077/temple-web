import { RootState } from 'storeConfig/store';

// Banner Selectors
export const selectServiceLoading = (state: RootState) => state.services.loading;
export const selectServiceList = (state: RootState) => state.services.services;
export const selectBookServiceStatus = (state: RootState) => state.services.message;
export const selecLocalBookingData = (state: RootState) => state.services.bookingData;
