import { RootState } from 'storeConfig/store';

// Banner Selectors
export const selectServiceLoading = (state: RootState) => state.services.loading;
export const selectServiceList = (state: RootState) => state.services.list;
