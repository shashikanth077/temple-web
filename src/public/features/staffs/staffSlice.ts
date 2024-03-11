import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Staff, ListResponse } from 'models';

export interface StaffState {
  loading: boolean;
  list: Staff[];
}

const initialState: StaffState = {
    loading: false,
    list: [],
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        fetchStaffList(state) {
            state.loading = true;
        },
        fetchStaffListSuccess(state, action: PayloadAction<ListResponse<Staff>>) {
            state.loading = false;
            state.list = action.payload.data;
        },
        fetchStaffListFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            console.log(action);
        },
    },
});

// Staff Actions
export const staffActions = staffSlice.actions;

// Staff Reducer
export const staffReducer = staffSlice.reducer;
