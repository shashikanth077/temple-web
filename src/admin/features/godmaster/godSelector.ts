import { RootState } from 'storeConfig/store';

export const selectGods = (state: RootState) => state.admin.gods.gods;
export const selectGod = (state: RootState) => state.admin.gods.god;
