import { RootState } from 'storeConfig/store';

export const selectDonationDetails = (state: RootState) => state.mydonations.donations;
