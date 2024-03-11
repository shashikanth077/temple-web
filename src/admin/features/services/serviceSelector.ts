import { RootState } from 'storeConfig/store';

export const selectServices = (state: RootState) => state.admin.adminService.services;
export const selectService = (state: RootState) => state.admin.adminService.service;
