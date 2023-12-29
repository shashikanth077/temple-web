import { RootState } from '../../storeConfig/store';

// Ads Selectors
export const selectAdsLoading = (state: RootState) => state.adverstiment.loading;
export const selectAdsList = (state: RootState) => state.adverstiment.list;
