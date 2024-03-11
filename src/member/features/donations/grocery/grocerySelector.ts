import { RootState } from 'storeConfig/store';

// Banner Selectors
export const selectCurrentGroceryCartItems = (state: RootState) => state.member.donategrocert.cart;
