import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    God, GodSingleResponse, SuccessRes, GodList,
} from 'models';

export interface godState {
    loading?: boolean;
    god:any;
    gods:any;
    message:string;
}

interface GetGodPayload {
    _id:string | undefined;
}
const initialState: godState = {
    loading: false,
    god: {},
    gods: [],
    message: '',
};

const godSlice = createSlice({
    name: 'admingod',
    initialState,
    reducers: {
        getGodById(state, action: PayloadAction<GetGodPayload>) {
            state.loading = true;
        },
        getGodByIdSuccess(state, action: PayloadAction<GodSingleResponse>) {
            state.loading = false;
            state.god = action.payload.god;
        },
        getGodDetails(state) {
            state.loading = true;
        },
        getGodDetailsSuccess(state, action: PayloadAction<GodList>) {
            state.loading = false;
            state.gods = action.payload.gods;
        },
        addgod(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        addgodSuccess(state, action: PayloadAction<SuccessRes>) {
            state.loading = false;
        },
        updategod(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        updategodSuccess(state, action: PayloadAction<SuccessRes>) {
            state.loading = false;
            state.message = action.payload.message;
        },
        deletegod(state, action: PayloadAction<GetGodPayload>) {
            state.loading = true;
        },
        deletegodSuccess(state, action: PayloadAction<SuccessRes>) {
            state.loading = false;
        },
    },
});

// Actions
export const admingodActions = godSlice.actions;

// Reducer
export const admingodReducer = godSlice.reducer;
