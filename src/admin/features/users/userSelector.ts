import { RootState } from 'storeConfig/store';

export const selectUsers = (state: RootState) => state.adminuser.users;
export const selectUser = (state: RootState) => state.adminuser.user;
