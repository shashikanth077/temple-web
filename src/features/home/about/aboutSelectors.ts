import { RootState } from 'storeConfig/store';

// Menu Selectors
export const selectAboutLoading = (state: RootState) => state.about.loading;
export const selectAboutList = (state: RootState) => state.about.list;
