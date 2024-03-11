import { RootState } from 'storeConfig/store';

// Menu Selectors
export const selectAboutLoading = (state: RootState) => state.public.about.loading;
export const selectAboutList = (state: RootState) => state.public.about.list;
