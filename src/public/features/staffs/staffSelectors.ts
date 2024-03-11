import { RootState } from 'storeConfig/store';

// Staff Selectors
export const selectStaffLoading = (state: RootState) => state.public.staff.loading;
export const selectStaffList = (state: RootState) => state.public.staff.list;
