import { RootState } from 'storeConfig/store';

export const selectGroceries = (state: RootState) => state.admin.admingrocery.groceries;
export const selectGrocery = (state: RootState) => state.admin.admingrocery.grocery;
