import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    Contact, ContactForm, SuccessRes, SingleResponse,
} from 'models';

type ContactData = {
    name:string;
    email:string;
    subject:string;
    message:string;
}

export interface ContactState {
  loading: boolean;
  error:any;
  list: Contact | null;
}

const initialState: ContactState = {
    loading: false,
    error: '',
    list: null,
};

export interface ContactFormInfo {
    loading: boolean;
    error:any;
    success:boolean;
  }

const initialStateInfo: ContactFormInfo = {
    loading: false,
    error: '',
    success: false,
};

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        fetchContactList(state) {
            state.loading = true;
        },
        fetchContactListSuccess(state, action: PayloadAction<SingleResponse<Contact>>) {
            state.loading = false;
            state.list = action.payload.data;
        },
        fetchContactListFailed(state, action: PayloadAction<string>) {
            state.loading = false;
        },
    },
});

const sendContactInfoSlice = createSlice({
    name: 'sendcontactinfo',
    initialState: initialStateInfo,
    reducers: {
        sendContactInfo(state, action: PayloadAction<ContactData>) {
            state.loading = true;
        },
    },
});

// Actions
export const contactActions = contactSlice.actions;
export const sendcontactActions = sendContactInfoSlice.actions;

// Reducer
export const contactReducer = contactSlice.reducer;
export const sendcontactReducer = sendContactInfoSlice.reducer;
