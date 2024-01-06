import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, userSingleResponse, userResponse } from 'models';

export interface UserState {
    loading?: boolean;
    error:any;
    message:string;
    users:any;
    user:any;
}

export interface GetUserPayload {
    _id:string | undefined;
}
const initialState: UserState = {
    loading: false,
    error: null,
    message: '',
    users: {},
    user: {},
};

const UserSlice = createSlice({
    name: 'adminusers',
    initialState,
    reducers: {
        getUsers(state) {
            state.loading = true;
        },
        getUsersSuccess(state, action: PayloadAction<userResponse>) {
            state.users = action.payload.userViewData;
        },
        getUserById(state, action: PayloadAction<GetUserPayload>) {
            state.loading = true;
        },
        getUserByIdSuccess(state, action: PayloadAction<userSingleResponse>) {
            state.user = action.payload.userData;
        },
        addUser(state, action: PayloadAction<User>) {
            state.loading = true;
        },
        updateUser(state, action: PayloadAction<User>) {
            state.loading = true;
        },
        deleteUser(state, action: PayloadAction<GetUserPayload>) {
            state.loading = true;
        },
    },
});

// Actions
export const adminUserActions = UserSlice.actions;

// Reducer
export const adminUserReducer = UserSlice.reducer;
