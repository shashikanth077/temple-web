import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserResponse } from 'models';

export interface LoginPayload {
    username: string;
    password: string;
  }

export interface AuthState {
    isLoggedIn: boolean;
    loading?: boolean;
    currentUser?: any;
    profileStatus:any;
    logoutstatus:boolean;
    error:any;
}

const initialState: AuthState = {
    isLoggedIn: false,
    loading: false,
    profileStatus: '',
    logoutstatus: false,
    currentUser: undefined,
    error: undefined,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.loading = true;
        },
        loginSuccess(state, action: PayloadAction<UserResponse>) {
            state.isLoggedIn = true;
            state.currentUser = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
        logoutSuccess(state, action: PayloadAction<string>) {
            state.isLoggedIn = false;
            state.logoutstatus = true;
        },
        updateProfileStatus(state, action: PayloadAction<string>) {
            state.profileStatus = action.payload;
        },
        logoutFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

// Actions
export const authActions = authSlice.actions;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
