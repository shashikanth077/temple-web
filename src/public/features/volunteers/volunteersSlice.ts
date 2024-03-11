import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SuccesResponse, Voluteers } from 'models';

export interface volunteerState {
  loading: boolean;
  message:string;
}
const initialState: volunteerState = {
    loading: false,
    message: '',
};

const volunteerSlice = createSlice({
    name: 'volunteers',
    initialState,
    reducers: {
        storeVolunteers(state, action: PayloadAction<Voluteers>) {
            state.loading = true;
        },
        storeVolunteersSucess(state, action: PayloadAction<SuccesResponse>) {
            state.loading = false;
            state.message = action.payload.message;
        },
    },
});

// volunteer Actions
export const volunteerActions = volunteerSlice.actions;

// volunteer Reducer
export const volunteerReducer = volunteerSlice.reducer;
