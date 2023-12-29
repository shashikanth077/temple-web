import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventListRes, ListResponse } from '../../models';

export interface EventState {
  loading: boolean;
  events: any;
}

const initialState: EventState = {
    loading: false,
    events: [],
};

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        fetchEvents(state) {
            state.loading = false;
        },
        fetchEventListSuccess(state, action: PayloadAction<EventListRes>) {
            state.loading = false;
            state.events = action.payload.events;
        },
    },
});

// Event Actions
export const eventsActions = eventsSlice.actions;

// Event Reducer
export const eventReducer = eventsSlice.reducer;
