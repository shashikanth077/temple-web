import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Cart, ListResponse, AddtoCartRes } from 'models';

interface CartInfo{
    userid:number;
}
interface DeleteProduct{
    userid:string;
    productId:string;
}
interface descreaseCart {
    cartid:number;
    quantity:number;
    productid:number;
    userid:number;
    sessionId:string;
}
export interface CartState {
    loading: boolean;
    cartItems: Cart[];
    addCartResponse:any;
    error:string;
  }

const initialState: CartState = {
    loading: false,
    cartItems: [],
    error: '',
    addCartResponse: {},

};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        getCartDetails(state, action: PayloadAction<CartInfo>) {
            state.loading = true;
        },
        getCartDetailsSuccess(state, action: PayloadAction<any>) {
            state.loading = true;
            state.cartItems = action.payload;
        },
        getCartDetailFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addtoCartItems(state, action) {
            state.loading = true;
        },
        addtoCartItemSuccess(state, action: PayloadAction<ListResponse<AddtoCartRes>>) {
            state.loading = false;
            state.addCartResponse = action.payload.data;
        },
        addtoCartItemFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteFromCart(state, action: PayloadAction<DeleteProduct>) {
            state.loading = true;
        },
        deleteFromCartSuccess(state, action: PayloadAction<ListResponse<AddtoCartRes>>) {
            state.loading = false;
            state.addCartResponse = action.payload.data;
        },
        deleteFromCartFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteAllFromCart(state) {
            state.cartItems = []; // need to call db for delete all
        },

    },
});

export const cartActions = cartSlice.actions;

// Reducer
export const cartReducer = cartSlice.reducer;
