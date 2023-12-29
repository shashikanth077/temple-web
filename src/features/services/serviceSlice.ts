import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Service, ListResponse } from 'models';

export interface ServiceState {
  loading: boolean;
  list: Service[];
}

const initialState: ServiceState = {
    loading: false,
    list: [],
};

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {
        fetchServiceList(state) {
            state.loading = true;
        },
        fetchServiceListSuccess(state, action: PayloadAction<ListResponse<Service>>) {
            state.loading = false;
            state.list = action.payload.data;
        },
        fetchServiceListFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            console.log(action);
        },
    },
});

// Service Actions
export const serviceActions = serviceSlice.actions;

// Service Reducer
export const serviceReducer = serviceSlice.reducer;
