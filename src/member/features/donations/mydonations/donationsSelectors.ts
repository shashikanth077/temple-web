import { RootState } from 'storeConfig/store';

export const selectDonationDetails = (state: RootState) => state.member.mydonations.donations;
export const selectSavedLocalDonatData = (state: RootState) => state.member.mydonations.donationData;
export const selectSessionId = (state: RootState) => state.member.mydonations.stripesession;
export const selectTaxReceiptData = (state: RootState) => state.member.mydonations.invoicedata;
