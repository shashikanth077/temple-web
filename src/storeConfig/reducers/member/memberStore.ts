import {
    combineReducers,
} from '@reduxjs/toolkit';
import { productReducer } from 'member/features/shop/memberView/providers/productSlice';
import { admincontentReducer } from 'contents/content/contentSlice';
import { mydonationsReducer } from 'member/features/donations/mydonations/donationSlice';
import { serviceReducer } from 'member/features/services/serviceSlice';
import { eventReducer } from 'member/features/events/eventsSlice';
import { myBookingsReducer } from 'member/features/bookings/bookingSlice';
import { cartReducer } from 'member/features/shop/cart/cartSlice';
import { GroceryCartReducer } from 'member/features/donations/grocery/grocerySlice';

const memberReducer = combineReducers({
    services: serviceReducer,
    events: eventReducer,
    bookings: myBookingsReducer,
    cartitems: cartReducer,
    product: productReducer,
    staticContent: admincontentReducer,
    donategrocert: GroceryCartReducer,
    mydonations: mydonationsReducer,
});

export default memberReducer;
