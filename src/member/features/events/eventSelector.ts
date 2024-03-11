import { RootState } from 'storeConfig/store';

// Events Selectors
export const selectEventsList = (state: RootState) => state.member.events.events;
export const selectEventsFilterList = (state: RootState) => state.member.events.eventsfilter;
