import { RootState } from 'storeConfig/store';

// Events Selectors
export const selectEventsList = (state: RootState) => state.public.events.events;
export const selectEventsFilterList = (state: RootState) => state.public.events.eventsfilter;
