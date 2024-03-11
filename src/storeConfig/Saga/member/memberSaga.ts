import { all } from 'redux-saga/effects';
import productsSaga from 'public/features/products/providers/productSaga';
import adminContentSaga from 'contents/content/contentSaga';
import myDonationSaga from 'member/features/donations/mydonations/donationSaga';
import cartSaga from 'member/features/shop/cart/cartSaga';
import serviceSaga from 'member/features/services/serviceSaga';
import eventsSaga from 'member/features/events/eventsSaga';
import bookingSaga from 'member/features/bookings/bookingSaga';

export default function* rootSaga() {
    yield all([
        serviceSaga(),
        eventsSaga(),
        bookingSaga(),
        myDonationSaga(),
        cartSaga(),
        productsSaga(),
        adminContentSaga(),
    ]);
}
