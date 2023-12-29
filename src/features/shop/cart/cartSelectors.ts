import { RootState } from 'storeConfig/store';

// Cart Selectors
export const selectCurrentCartData = (state: RootState) => ({
    loading: state.cartitems.loading,
    list: state.cartitems.cartItems,
});

// response data after add to cart
export const selectAddtoCartResponse = (state: RootState) => ({
    loading: state.cartitems.loading,
    updatedCartData: state.cartitems.addCartResponse,
});
