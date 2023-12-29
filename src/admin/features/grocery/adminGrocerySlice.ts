import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Grocery, GrocerySingleRes, GroceryListRes } from 'models';

export interface GroceryState {
    loading?: boolean;
    error:any;
    message:string;
    grocery:any;
    groceries:any;
}

export interface GetGroceryPayload {
    _id:string | undefined;
}
const initialState: GroceryState = {
    loading: false,
    error: null,
    message: '',
    grocery: {},
    groceries: [],
};

const GrocerySlice = createSlice({
    name: 'adminGrocery',
    initialState,
    reducers: {
        getAllGroceries(state) {
            state.loading = true;
        },
        getAllGroceriesSuccess(state, action: PayloadAction<GroceryListRes>) {
            state.groceries = action.payload.groceries;
        },
        getGroceryById(state, action: PayloadAction<GetGroceryPayload>) {
            state.loading = true;
        },
        getGroceryByIdSuccess(state, action: PayloadAction<GrocerySingleRes>) {
            state.grocery = action.payload.grocery;
        },
        addGrocery(state, action: PayloadAction<Grocery>) {
            state.loading = true;
        },
        updateGrocery(state, action: PayloadAction<Grocery>) {
            state.loading = true;
        },
        deleteGrocery(state, action: PayloadAction<GetGroceryPayload>) {
            state.loading = true;
        },
    },
});

// Actions
export const adminGroceryActions = GrocerySlice.actions;

// Reducer
export const adminGroceryReducer = GrocerySlice.reducer;
