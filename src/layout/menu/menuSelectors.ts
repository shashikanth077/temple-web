import { RootState } from 'storeConfig/store';

// Menu Selectors
export const selectMenuLoading = (state: RootState) => state.menu.loading;
export const selectMenuList = (state: RootState) => state.menu.list;
