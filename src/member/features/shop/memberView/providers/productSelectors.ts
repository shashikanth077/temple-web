import { RootState } from 'storeConfig/store';

// Cart Selectors
export const selectProductsLoading = (state: RootState) => state.member.product.loading;
export const selectProductsList = (state: RootState) => state.member.product.products;
export const selectProduct = (state: RootState) => state.member.product.product;
