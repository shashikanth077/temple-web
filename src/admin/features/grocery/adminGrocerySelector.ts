import { RootState } from 'storeConfig/store';

export const selectGroceries = (state: RootState) => state.admingrocery.groceries;
export const selectGrocery = (state: RootState) => state.admingrocery.grocery;
