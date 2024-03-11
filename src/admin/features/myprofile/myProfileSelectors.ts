import { RootState } from 'storeConfig/store';

// Profile Selectors
export const selectMyProfileDetails = (state: RootState) => state.admin.myprofile.list;
export const selectFamilyById = (state: RootState) => state.admin.myprofile.family;
export const selectFamilies = (state: RootState) => state.admin.myprofile.families;
export const selectDeasedById = (state: RootState) => state.admin.myprofile.deceased;
export const selectDeasedList = (state: RootState) => state.admin.myprofile.deceasedlist;
