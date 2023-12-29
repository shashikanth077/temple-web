import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DonationRes, DonationSingleRes, Donation } from 'models';

export interface DonationState {
    loading?: boolean;
    donation:any;
    donations:any;
    message:string;
}

interface GetDonationPayload {
    userid:string | undefined;
}
const initialState: DonationState = {
    loading: false,
    donation: {},
    donations: [],
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
    },
});

// Actions
export const mydonationsActions = DonationSlice.actions;

// Reducer
export const mydonationsReducer = DonationSlice.reducer;
