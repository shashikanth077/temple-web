import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { string } from 'yup';
import { User, Activation } from 'models/user';
import { UserSuccesResponse, OTPResponse } from 'models';

export interface RegisterState {
    loading?: boolean;
    userSignUp:boolean;
    email:string;
    otp:string;
    mobileNumber:string;
    message:string;
    countrycode:string;
}

interface OTPPayload {
    phoneNumber:string;
}

interface OTPVerifyPayload {
    phoneNumber:string;
    otp:string;
}

const initialState: RegisterState = {
    loading: false,
    userSignUp: false,
    email: '',
    countrycode: '',
    mobileNumber: '',
    otp: '',
    message: '',
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        register(state, action: PayloadAction<User>) {
            state.loading = true;
            state.userSignUp = false;
        },
        registerSuccess(state, action: PayloadAction<UserSuccesResponse>) {
            state.loading = false;
            state.userSignUp = true;
            state.email = action.payload.email;
            state.mobileNumber = action.payload.phonenumber;
            state.countrycode = action.payload.countrycode;
        },
        activation(state, action: PayloadAction<Activation>) {
            state.loading = true;
            state.userSignUp = false;
        },
        sendOtp(state, action: PayloadAction<OTPPayload>) {
            state.loading = true;
        },
        sendOtpSuccess(state, action: PayloadAction<OTPResponse>) {
            state.loading = true;
            state.otp = action.payload.otp;
        },
        verifyOTP(state, action: PayloadAction<OTPVerifyPayload>) {
            state.loading = true;
        },
        resetRegisterData(state) {
            state.userSignUp = false;
            state.email = '';
            state.mobileNumber = '';
            state.countrycode = '';
        },
    },
});

// Actions
export const registerActions = registerSlice.actions;

// Reducer
const registerReducer = registerSlice.reducer;
export default registerReducer;
