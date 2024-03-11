import { all } from 'redux-saga/effects';
import contactSaga from 'public/features/contact/contactSaga';
import authSaga from 'public/features/auth/login/loginSaga';
import registerSaga from 'public/features/auth/register/registerSaga';
import forgotpasswodSaga from 'public/features/auth/login/forgotpassword/forgotpassSaga';
import VoluteersSaga from 'public/features/volunteers/voluteersSaga';
import aboutSaga from 'public/features/home/about/aboutSaga';
import productsSaga from 'public/features/products/providers/productSaga';
import adminContentSaga from 'contents/content/contentSaga';
import serviceSaga from 'public/features/services/serviceSaga';
import eventsSaga from 'public/features/events/eventsSaga';
import bookingSaga from 'public/features/bookings/bookingSaga';

export default function* rootSaga() {
    yield all([
        contactSaga(),
        serviceSaga(),
        eventsSaga(),
        bookingSaga(),
        aboutSaga(),
        authSaga(),
        registerSaga(),
        forgotpasswodSaga(),
        productsSaga(),
        adminContentSaga(),
        VoluteersSaga(),
    ]);
}
