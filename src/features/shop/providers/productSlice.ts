import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Products, ProductListRes } from 'models';

export interface shopState {
  loading: boolean;
  products: any;
  error:string;
}

const initialState: shopState = {
    loading: false,
    products: [],
    error: '',
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchproductList(state) {
            state.loading = true;
        },
        fetchproductListSuccess(state, action: PayloadAction<ProductListRes>) {
            state.loading = false;
            state.products = action.payload.products;
        },
    },
});

// Products Actions
export const productActions = productSlice.actions;

// Products Reducer
export const productReducer = productSlice.reducer;
