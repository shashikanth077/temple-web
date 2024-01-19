import { RootState } from 'storeConfig/store';

// Profile Selectors
export const selectMyProfileDetails = (state: RootState) => state.myprofile.list;
export const selectFamilyById = (state: RootState) => state.myprofile.family;
export const selectFamilies = (state: RootState) => state.myprofile.families;
export const selectDeasedById = (state: RootState) => state.myprofile.deceased;
