import { RootState } from 'storeConfig/store';

// Cart Selectors
export const selectCurrentCartData = (state: RootState) => ({
    loading: state.member.cartitems.loading,
    list: state.member.cartitems.cartItems,
});

// response data after add to cart
export const selectAddtoCartResponse = (state: RootState) => ({
    loading: state.member.cartitems.loading,
    updatedCartData: state.member.cartitems.addCartResponse,
});
