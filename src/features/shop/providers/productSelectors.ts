import { RootState } from 'storeConfig/store';

// Cart Selectors
export const selectProductsLoading = (state: RootState) => state.product.loading;
export const selectProductsList = (state: RootState) => state.product.products;
