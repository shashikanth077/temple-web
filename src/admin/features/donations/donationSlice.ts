import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    DonationTypesList, DonationTypesSingle,
} from 'models';

export interface DonationState {
    loading?: boolean;
    donationtype:any;
    donationtypes:any;
    message:string;
}

export interface DonationPayload {
    _id:string | undefined;
}

const initialState: DonationState = {
    loading: false,
    donationtype: {},
    donationtypes: [],
    message: '',
};

const DonationSlice = createSlice({
    name: 'admindonationtypes',
    initialState,
    reducers: {
        getDonationById(state, action: PayloadAction<DonationPayload>) {
            state.loading = true;
        },
        getDonationByIdSuccess(state, action: PayloadAction<DonationTypesSingle>) {
            state.loading = false;
            state.donationtype = action.payload.donationType;
        },
        getDonationDetails(state) {
            state.loading = true;
        },
        getDonationDetailsSuccess(state, action: PayloadAction<DonationTypesList>) {
            state.loading = false;
            state.donationtypes = action.payload.donationTypeDetails;
        },
        addDonation(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        updateDonation(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        deleteDonation(state, action: PayloadAction<DonationPayload>) {
            state.loading = true;
        },
    },
});

// Actions
export const adminDonationTypeActions = DonationSlice.actions;

// Reducer
export const adminDonationTypeReducer = DonationSlice.reducer;
