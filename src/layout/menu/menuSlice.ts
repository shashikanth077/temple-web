import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Menu, ListResponse } from '../../models';

export interface MenuState {
  loading: boolean;
  list: Menu[];
}

const initialState: MenuState = {
    loading: false,
    list: [],
};

const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        fetchMenuList(state) {
            state.loading = true;
        },
        fetchMenuListSuccess(state, action: PayloadAction<ListResponse<Menu>>) {
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
export const menuActions = menuSlice.actions;

// menu Reducer
export const menuReducer = menuSlice.reducer;
