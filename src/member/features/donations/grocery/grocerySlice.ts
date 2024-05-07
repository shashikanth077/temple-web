import { createSlice } from '@reduxjs/toolkit';

export interface groceryState {
    cart: any;
}

const initialState: groceryState = {
    cart: [],
};

/* eslint-disable */
const cartSlice = createSlice({
    name: 'groceryCart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let product:any = action.payload;

            let newArray;
            if(Array.isArray(state.cart)) {
                newArray=state.cart;
            } else {
                newArray=[state.cart]
            }
            let itemInCart = newArray?.find((item:any) => item._id === action.payload._id);

            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart?.push({ ...product, quantity: 1 });
            }
        },
        UpdateQuantity: (state, action) => {
            let newArray;
            if(Array.isArray(state.cart)) {
                newArray=state.cart;
            } else {
                newArray=[state.cart]
            }
            let itemInCart = newArray?.find((item:any) => item._id === action.payload._id);
            itemInCart.quantity = action.payload.quantity;
        },
        removeItem: (state, action) => {
            let newArray;
            if(Array.isArray(state.cart)) {
                newArray=state.cart;
            } else {
                newArray=[state.cart]
            }
            const removeItem = newArray?.filter((item:any) => item._id !== action.payload._id);
            state.cart = removeItem;
        },
        ClearCart : (state) =>{
            state.cart = [];
        }
    },
});

export const GroceryCartReducer = cartSlice.reducer;
export const {
    addToCart,
    UpdateQuantity,
    removeItem,
    ClearCart
} = cartSlice.actions;
