import { RootState } from 'storeConfig/store';

export const selectadminMenuSelectorsloading = (state: RootState) => state.adminmenu.loading;
export const selectadminmenuList = (state: RootState) => state.adminmenu.list;
