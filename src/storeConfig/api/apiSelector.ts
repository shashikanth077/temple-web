import { createSelector, Selector } from 'reselect';
import { RootState } from 'storeConfig/store';

interface ApiState {
    loading: boolean;
    error: string | null | undefined;
    successMessage: string | null;
  }

const selectApiState = (state: RootState) => state.apiState;

export const getApiState: Selector<RootState, ApiState> = createSelector(
    selectApiState,
    apiState => ({
        ...apiState,
        error: apiState.error || null, // Handle undefined by converting to null
    }),
);
