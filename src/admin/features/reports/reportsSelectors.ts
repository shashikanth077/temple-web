import { RootState } from 'storeConfig/store';

export const selectInComeReportDetails = (state: RootState) => state.reports.reports;
