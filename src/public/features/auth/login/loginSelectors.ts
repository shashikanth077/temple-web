import { RootState } from 'storeConfig/store';

// Login Selectors
export const selectloginLoading = (state: RootState) => state.public.login.loading;
export const selectCurrentUser = (state: RootState) => state.public.login.currentUser;
export const selectIsLoggedin = (state: RootState) => state.public.login.isLoggedIn;
export const selectIsProfileStatus = (state: RootState) => state.public.login.profileStatus;
