import { RootState } from 'storeConfig/store';

// Cart Selectors
export const selectProductsLoading = (state: RootState) => state.public.product.loading;
export const selectProductsList = (state: RootState) => state.public.product.products;
export const selectProduct = (state: RootState) => state.public.product.product;
