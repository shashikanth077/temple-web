import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductSingleRes, ProductListRes } from 'models';

export interface shopState {
  loading: boolean;
  products: any;
  product:any;
  error:string;
}

const initialState: shopState = {
    loading: false,
    products: [],
    product: {},
    error: '',
};

export interface ProductId {
    id:string | undefined;
}

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        fetchproductList(state) {
            state.loading = true;
        },
        fetchproductListSuccess(state, action: PayloadAction<ProductListRes>) {
            state.products = action.payload.products;
        },
        fetchproduct(state, action: PayloadAction<ProductId>) {
            state.loading = true;
        },
        fetchproductSuccess(state, action: PayloadAction<ProductSingleRes>) {
            state.product = action.payload.product;
        },
    },
});

// Products Actions
export const productActions = productSlice.actions;

// Products Reducer
export const productReducer = productSlice.reducer;
