import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, forgotResPassword, SingleResponse } from 'models';

export interface UserPayload {
    email: string;
}

export interface ResetPayload {
    password: string;
}

export interface AuthState {
    loading?: boolean;
    link?: any;
    error:any;
}

const initialState: AuthState = {
    loading: false,
    link: undefined,
    error: false,
};

const forgotpasswodSlice = createSlice({
    name: 'forgotpassword',
    initialState,
    reducers: {
        forgotpasswod(state, action: PayloadAction<UserPayload>) {
            state.loading = true;
        },
        forgotpasswodSuccess(state, action: PayloadAction<SingleResponse<forgotResPassword>>) {
            state.link = action.payload;
        },
        resetPassword(state, action: PayloadAction<ResetPayload>) {
            state.loading = true;
        },
        resetPasswordSuccess(state, action: PayloadAction<SingleResponse<User>>) {
            state.loading = false;
            state.link = action.payload.data;
        },
        resetPasswordFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        resetForgot(state) {
            state.loading = false;
            state.error = false;
            state.link = null;
        },
    },
});

// Actions
export const forgotpasswodActions = forgotpasswodSlice.actions;

// Reducer
const forgotpasswordReducer = forgotpasswodSlice.reducer;
export default forgotpasswordReducer;
