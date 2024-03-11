import { RootState } from 'storeConfig/store';

export const selectadminMenuSelectorsloading = (state: RootState) => state.admin.adminmenu.loading;
export const selectadminmenuList = (state: RootState) => state.admin.adminmenu.list;
