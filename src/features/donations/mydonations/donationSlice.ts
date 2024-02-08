import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    DonationRes, DonationForm, Donation, SuccesResponse,
} from 'models';

export interface DonationState {
    loading?: boolean;
    donation:any;
    donations:any;
    donationData:any;
    stripesession:any;
    message:string;
}

interface GetDonationPayload {
    userid:string | undefined;
}
const initialState: DonationState = {
    loading: false,
    donation: {},
    stripesession: {},
    donations: [],
    donationData: [],
    message: '',
};

const DonationSlice = createSlice({
    name: 'mydonations',
    initialState,
    reducers: {
        getDonations(state, action: PayloadAction<GetDonationPayload>) {
            state.loading = true;
        },
        getDonationsSuccess(state, action: PayloadAction<DonationRes>) {
            state.loading = false;
            state.donations = action.payload.donations;
        },
        saveDonationLocalData(state, action: PayloadAction<DonationForm>) {
            state.loading = false;
            state.donationData = action.payload;
        },
        getSessionId(state, action: PayloadAction<DonationForm>) {
            state.loading = false;
        },
        getSessionIdSuccess(state, action: PayloadAction<any>) {
            state.stripesession = action.payload;
        },
        PayDonation(state, action: PayloadAction<any>) {
            state.loading = false;
        },
    },
});

// Actions
export const mydonationsActions = DonationSlice.actions;

// Reducer
export const mydonationsReducer = DonationSlice.reducer;
