import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, Activation } from 'models/user';
import { UserSuccesResponse } from 'models';

export interface RegisterState {
    loading?: boolean;
    userSignUp:boolean;
    email:string;
    message:string;
}

const initialState: RegisterState = {
    loading: false,
    userSignUp: false,
    email: '',
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
        },
        activation(state, action: PayloadAction<Activation>) {
            state.loading = true;
            state.userSignUp = false;
        },
    },
});

// Actions
export const registerActions = registerSlice.actions;

// Reducer
const registerReducer = registerSlice.reducer;
export default registerReducer;
