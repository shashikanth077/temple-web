import { createSelector, Selector } from 'reselect';
import { RootState } from 'storeConfig/store';

interface ApiState {
    loading: boolean;
    error: string | null | undefined;
    successMessage: string | null;
  }

const selectApiState = (state: RootState) => state.public.apiState;

export const getApiState: Selector<RootState, ApiState> = createSelector(
    selectApiState,
    apiState => ({
        ...apiState,
        error: apiState.error || null,
    }),
);
