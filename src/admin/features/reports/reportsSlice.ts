import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReportsRes } from 'models';

export interface Reportstate {
    loading?: boolean;
    report:any;
    reports:any;
    message:string;
}

const initialState: Reportstate = {
    loading: false,
    report: {},
    reports: [],
    message: '',
};

const reportSlice = createSlice({
    name: 'Reports',
    initialState,
    reducers: {
        getReports(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        getReportsSuccess(state, action: PayloadAction<ReportsRes>) {
            state.loading = false;
            state.reports = action.payload.reports;
        },
    },
});

// Actions
export const adminReportsActions = reportSlice.actions;

// Reducer
export const adminReportsReducer = reportSlice.reducer;
