import { RootState } from 'storeConfig/store';

// forgot Selectors
export const selectloginLoading = (state: RootState) => state.public.forgotpassword.loading;
export const selectForgotpassworderror = (state: RootState) => state.public.forgotpassword.error;
export const selectforgotpasswordLink = (state: RootState) => state.public.forgotpassword.link;
