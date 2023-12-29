import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminMenuItemTypes, ListResponse } from 'models';

export interface MenuState {
  loading: boolean;
  list: AdminMenuItemTypes[];
}

const initialState: MenuState = {
    loading: false,
    list: [],
};

const menuSlice = createSlice({
    name: 'adminmenu',
    initialState,
    reducers: {
        fetchMenuList(state) {
            state.loading = true;
        },
        fetchMenuListSuccess(state, action: PayloadAction<ListResponse<AdminMenuItemTypes>>) {
            state.loading = false;
            state.list = action.payload.data;
        },
        fetchMenuListFailed(state, action: PayloadAction<string>) {
            state.loading = false;
            console.log(action);
        },
    },
});

// menu Actions
export const adminmenuActions = menuSlice.actions;

// menu Reducer
export const adminmenuReducer = menuSlice.reducer;
