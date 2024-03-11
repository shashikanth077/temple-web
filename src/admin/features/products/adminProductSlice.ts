import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductListRes, ProductSingleRes } from 'models';

export interface ProductState {
    loading?: boolean;
    error:any;
    message:string;
    product:any;
    products:any;
}

export interface GetProductPayload {
    _id:string | undefined;
}
const initialState: ProductState = {
    loading: false,
    error: null,
    message: '',
    products: [],
    product: {},
};

const productSlice = createSlice({
    name: 'adminproduct',
    initialState,
    reducers: {
        fetchproductList(state) {
            state.loading = true;
        },
        fetchproductListSuccess(state, action: PayloadAction<ProductListRes>) {
            state.products = action.payload.products;
        },
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
