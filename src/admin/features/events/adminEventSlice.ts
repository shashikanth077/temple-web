import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event, SuccessRes, EventSingleRes } from 'models';

export interface EventState {
    loading?: boolean;
    error:any;
    message:string;
    event:any;
}

export interface GetEventPayload {
    _id:string | undefined;
}
const initialState: EventState = {
    loading: false,
    error: '',
    message: '',
    event: {},
};

const EventSlice = createSlice({
    name: 'adminEvent',
    initialState,
    reducers: {
        getEventById(state, action: PayloadAction<GetEventPayload>) {
            state.loading = true;
        },
        getEventByIdSuccess(state, action: PayloadAction<EventSingleRes>) {
            state.loading = false;
            state.event = action.payload.event;
        },
        addEvent(state, action: PayloadAction<any>) {
            state.loading = true;
        },
        updateEvent(state, action: PayloadAction<Event>) {
            state.loading = true;
        },
        deleteEvent(state, action: PayloadAction<GetEventPayload>) {
            state.loading = true;
        },
    },
});

// Actions
export const adminEventActions = EventSlice.actions;

// Reducer
export const adminEventReducer = EventSlice.reducer;
