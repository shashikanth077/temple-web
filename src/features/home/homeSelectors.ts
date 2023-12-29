import { RootState } from 'storeConfig/store';

// Banner Selectors
export const selectBannerLoading = (state: RootState) => state.banner.loading;
export const selectBannerList = (state: RootState) => state.banner.list;
