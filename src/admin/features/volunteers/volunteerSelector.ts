import { RootState } from 'storeConfig/store';

export const selectVolunters = (state: RootState) => state.admin.adminVoltr.volunteers;
export const selectCertificateData = (state: RootState) => state.admin.adminVoltr.certilocal;
