import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    VoluteersRes,
} from 'models';

export interface volunteersState {
    loading?: boolean;
    volunteers:any;
    message:string;
    certilocal:any;
}

export interface volunteerPayload {
    status:string;
    _id:string;
}

const initialState: volunteersState = {
    loading: false,
    volunteers: [],
    message: '',
    certilocal: [],
};

const volunteersSlice = createSlice({
    name: 'adminvolunteers',
    initialState,
    reducers: {
        getVolunteers(state) {
            state.loading = false;
        },
        getvolunteersDetailsSuccess(state, action: PayloadAction<VoluteersRes>) {
            state.loading = false;
            state.volunteers = action.payload.volunteers;
        },
        updateVolunteer(state, action: PayloadAction<volunteerPayload>) {
            state.loading = false;
        },
        storeCertificateDataLocal(state, action: PayloadAction<VoluteersRes>) {
            state.loading = false;
            state.certilocal = action.payload;
        },
        clearCertiLocal(state) {
            state.loading = false;
            state.certilocal = [];
        },
    },
});

// Actions
export const adminVolunteersActions = volunteersSlice.actions;

// Reducer
export const adminVolunteersReducer = volunteersSlice.reducer;
