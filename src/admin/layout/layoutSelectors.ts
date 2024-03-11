import { RootState } from 'storeConfig/store';

export const selectleftSideBarType = (state: RootState) => state.admin.adminlayout.leftSideBarType;
