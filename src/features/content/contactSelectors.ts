import { RootState } from 'storeConfig/store';

export const selectStaticContentServices = (state: RootState) => state.staticContent.services;
export const selectStaticContentShop = (state: RootState) => state.staticContent.shop;
export const selectStaticContentHome = (state: RootState) => state.staticContent.home;
export const selectStaticRegistration = (state: RootState) => state.staticContent.registration;
