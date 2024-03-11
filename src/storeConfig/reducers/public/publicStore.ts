import {
    combineReducers,
} from '@reduxjs/toolkit';
import apiReducer from 'storeConfig/apiStatus/apiSlice';
import { productReducer } from 'public/features/products/providers/productSlice';
import { contactReducer, sendcontactReducer } from 'public/features/contact/contactSlice';
import forgotpasswordReducer from 'public/features/auth/login/forgotpassword/forgotpassSlice';
import authReducer from 'public/features/auth/login/loginSlice';
import registerReducer from 'public/features/auth/register/registerSlice';
import { volunteerReducer } from 'public/features/volunteers/volunteersSlice';
import { serviceReducer } from 'public/features/services/serviceSlice';
import { eventReducer } from 'public/features/events/eventsSlice';
import { staffReducer } from 'public/features/staffs/staffSlice';
import { BookingsReducer } from 'public/features/bookings/bookingSlice';
import { AboutReducer } from 'public/features/home/about/aboutSlice';

const publicReducer = combineReducers({
    contact: contactReducer,
    sendcontact: sendcontactReducer,
    services: serviceReducer,
    events: eventReducer,
    apiState: apiReducer,
    staff: staffReducer,
    about: AboutReducer,
    login: authReducer,
    bookings: BookingsReducer,
    register: registerReducer,
    forgotpassword: forgotpasswordReducer,
    product: productReducer,
    volunteers: volunteerReducer,
});

export default publicReducer;
