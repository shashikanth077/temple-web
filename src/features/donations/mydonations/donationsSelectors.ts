import { RootState } from 'storeConfig/store';

export const selectDonationDetails = (state: RootState) => state.mydonations.donations;
export const selectSavedLocalDonatData = (state: RootState) => state.mydonations.donationData;
export const selectSessionId = (state: RootState) => state.mydonations.stripesession;
