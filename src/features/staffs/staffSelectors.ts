import { RootState } from 'storeConfig/store';

// Staff Selectors
export const selectStaffLoading = (state: RootState) => state.staff.loading;
export const selectStaffList = (state: RootState) => state.staff.list;
