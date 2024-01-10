import { RootState } from 'storeConfig/store';

export const selectDonationTypes = (state: RootState) => state.admindonationtypes.donationtypes;
export const selectDonationType = (state: RootState) => state.admindonationtypes.donationtype;
