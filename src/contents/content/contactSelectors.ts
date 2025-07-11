import { RootState } from 'storeConfig/store';

export const selectStaticContentServices = (state: RootState) => state.member.staticContent.services;
export const selectStaticContentShop = (state: RootState) => state.member.staticContent.shop;
export const selectStaticContentHome = (state: RootState) => state.member.staticContent.home;
export const selectStaticRegistration = (state: RootState) => state.member.staticContent.registration;
export const selectStaticAbout = (state: RootState) => state.member.staticContent.about;
export const selectStaticTopbar = (state: RootState) => state.member.staticContent.topbar;
export const selectStaticHeader = (state: RootState) => state.member.staticContent.header;
export const selectStaticFooter = (state: RootState) => state.member.staticContent.footer;
export const selectContactDetails = (state: RootState) => state.member.staticContent.contactdetails;
export const selectContactformDetails = (state: RootState) => state.member.staticContent.contactform;
export const selectAds = (state: RootState) => state.member.staticContent.ads;
export const selectStaffs = (state: RootState) => state.member.staticContent.staff;
export const selectAdminMenu = (state: RootState) => state.member.staticContent.adminmenu;
export const selectPublicMenu = (state: RootState) => state.member.staticContent.publicmenu;
export const selectStaticVoluteers = (state: RootState) => state.member.staticContent.volunteers;
export const selectStaticTaxReceipt = (state: RootState) => state.member.staticContent.taxreceipt;
export const selectStaticBookings = (state: RootState) => state.member.staticContent.bookings;
export const selectStaticDonation = (state: RootState) => state.member.staticContent.donations;
export const selectStaticEvents = (state: RootState) => state.member.staticContent.events;
export const selectStaticGods = (state: RootState) => state.member.staticContent.godmaster;
export const selectStaticUsers = (state: RootState) => state.member.staticContent.users;
export const selectStaticAdminvolunteers = (state:RootState) => state.member.staticContent.adminvolunteers;
export const selectStaticSiteManage = (state:RootState) => state.member.staticContent.sitestaticdata;
