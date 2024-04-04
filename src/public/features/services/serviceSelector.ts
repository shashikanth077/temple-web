import { RootState } from 'storeConfig/store';

export const selectServiceLoading = (state: RootState) => state.public.services.loading;
export const selectServiceList = (state: RootState) => state.public.services.services;
export const selectAllServiceList = (state: RootState) => state.public.services.allservices;
