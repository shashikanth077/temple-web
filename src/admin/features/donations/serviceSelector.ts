import { RootState } from 'storeConfig/store';

export const selectServices = (state: RootState) => state.adminService.services;
export const selectService = (state: RootState) => state.adminService.service;
