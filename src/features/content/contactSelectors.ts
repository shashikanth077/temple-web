import { RootState } from 'storeConfig/store';

export const selectStaticContentServices = (state: RootState) => state.staticContent.services;
export const selectStaticContentShop = (state: RootState) => state.staticContent.shop;
export const selectStaticContentHome = (state: RootState) => state.staticContent.home;
export const selectStaticRegistration = (state: RootState) => state.staticContent.registration;
export const selectStaticAbout = (state: RootState) => state.staticContent.about;
export const selectStaticTopbar = (state: RootState) => state.staticContent.topbar;
export const selectStaticHeader = (state: RootState) => state.staticContent.header;
export const selectStaticFooter = (state: RootState) => state.staticContent.footer;
export const selectContactDetails = (state: RootState) => state.staticContent.contactdetails;
export const selectContactformDetails = (state: RootState) => state.staticContent.contactform;
export const selectAds = (state: RootState) => state.staticContent.ads;
export const selectStaffs = (state: RootState) => state.staticContent.staff;
