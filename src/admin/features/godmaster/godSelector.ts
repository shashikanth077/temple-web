import { RootState } from 'storeConfig/store';

export const selectGods = (state: RootState) => state.gods.gods;
export const selectGod = (state: RootState) => state.gods.god;
