import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductSingleRes } from 'models';

export interface ProductState {
    loading?: boolean;
    error:any;
    message:string;
    product:any;
}

export interface GetProductPayload {
    _id:string | undefined;
}
const initialState: ProductState = {
    loading: false,
    error: null,
    message: '',
    product: {},
};

const productSlice = createSlice({
    name: 'adminproduct',
    initialState,
    reducers: {
        getProductById(state, action: PayloadAction<GetProductPayload>) {
            state.loading = true;
        },
        getProductByIdSuccess(state, action: PayloadAction<ProductSingleRes>) {
            state.product = action.payload.product;
        },
        addProduct(state, action: PayloadAction<Product>) {
            state.loading = true;
        },
        updateProduct(state, action: PayloadAction<Product>) {
            state.loading = true;
        },
        deleteProduct(state, action: PayloadAction<GetProductPayload>) {
            state.loading = true;
        },
    },
});

// Actions
export const adminProductActions = productSlice.actions;

// Reducer
export const adminProductReducer = productSlice.reducer;
