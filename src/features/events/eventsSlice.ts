import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventListRes } from '../../models';

export interface EventState {
  loading: boolean;
  events: any;
  eventData:any;
}

const initialState: EventState = {
    loading: false,
    events: [],
    eventData: [],
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
        confirmPayment(state, action: PayloadAction<any>) {
            state.loading = false;
        },
    },
});

export const eventsActions = eventsSlice.actions;

export const eventReducer = eventsSlice.reducer;
