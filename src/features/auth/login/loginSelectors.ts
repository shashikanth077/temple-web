import { RootState } from 'storeConfig/store';

// Login Selectors
export const selectloginLoading = (state: RootState) => state.login.loading;
export const selectCurrentUser = (state: RootState) => state.login.currentUser;
export const selectIsLoggedin = (state: RootState) => state.login.isLoggedIn;
