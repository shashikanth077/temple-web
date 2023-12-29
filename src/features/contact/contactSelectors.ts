import { RootState } from 'storeConfig/store';

// Selectors contact info
export const selectContactLoading = (state: RootState) => state.contact.loading;
export const selectContactList = (state: RootState) => state.contact.list;

// Selectors Submit contact info
export const selectSendContactLoading = (state: RootState) => state.sendcontact.loading;
export const selectSendContactList = (state: RootState) => state.sendcontact.success;
