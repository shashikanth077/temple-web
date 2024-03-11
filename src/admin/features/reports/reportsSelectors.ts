import { RootState } from 'storeConfig/store';

export const selectInComeReportDetails = (state: RootState) => state.admin.reports.reports;
