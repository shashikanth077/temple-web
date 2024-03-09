import { RootState } from '../../storeConfig/store';

// Events Selectors
export const selectEventsList = (state: RootState) => state.events.events;
export const selectEventsFilterList = (state: RootState) => state.events.eventsfilter;
