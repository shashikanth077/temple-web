import { RootState } from 'storeConfig/store';

// forgot Selectors
export const selectloginLoading = (state: RootState) => state.forgotpassword.loading;
export const selectForgotpassworderror = (state: RootState) => state.forgotpassword.error;
export const selectforgotpasswordLink = (state: RootState) => state.forgotpassword.link;
