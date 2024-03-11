import { RootState } from '../../../storeConfig/store';

// Events Selectors
export const selectEventsList = (state: RootState) => state.admin.adminEvent.events;
