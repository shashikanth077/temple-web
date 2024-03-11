import { RootState } from 'storeConfig/store';

// Selectors contact info
export const selectContactLoading = (state: RootState) => state.public.contact.loading;
export const selectContactList = (state: RootState) => state.public.contact.list;

// Selectors Submit contact info
export const selectSendContactLoading = (state: RootState) => state.public.sendcontact.loading;
export const selectSendContactList = (state: RootState) => state.public.sendcontact.success;
