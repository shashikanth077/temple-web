import { RootState } from 'storeConfig/store';

export const selectDonationTypes = (state: RootState) => state.admin.admindonationtypes.donationtypes;
export const selectDonationType = (state: RootState) => state.admin.admindonationtypes.donationtype;
