import { RootState } from 'storeConfig/store';

export const selectUsers = (state: RootState) => state.admin.adminuser.users;
export const selectUser = (state: RootState) => state.admin.adminuser.user;
