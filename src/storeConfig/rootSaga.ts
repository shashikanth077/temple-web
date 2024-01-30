import { all } from 'redux-saga/effects';
import menuSaga from 'layout/menu/menuSaga';
import bannerSaga from 'features/home/homeSaga';
import serviceSaga from 'features/services/serviceSaga';
import aboutSaga from 'features/home/about/aboutSaga';
import eventsSaga from 'features/events/eventsSaga';
import bookingSaga from 'features/bookings/bookingSaga';
import StaffSaga from 'features/staffs/staffSaga';
import advertismentSaga from 'features/adversitments/adversimentsSaga';
import cartSaga from 'features/shop/cart/cartSaga';
import productsSaga from 'features/shop/providers/productSaga';
import contactSaga from 'features/contact/contactSaga';
import authSaga from 'features/auth/login/loginSaga';
import registerSaga from 'features/auth/register/registerSaga';
import forgotpasswodSaga from 'features/auth/login/forgotpassword/forgotpassSaga';
import adminmenuSaga from 'admin/layout/menu/menuSaga';
import AdminLayoutSaga from 'admin/layout/layoutSaga';
import adminProductSaga from 'admin/features/products/adminProductSaga';
import myProfileSaga from 'admin/features/myprofile/myprofileSaga';
import adminGodSaga from 'admin/features/godmaster/godSaga';
import adminServiceSaga from 'admin/features/services/serviceSaga';
import adminEventSaga from 'admin/features/events/adminEventSaga';
import adminContentSaga from 'features/content/contentSaga';
import adminUserSaga from 'admin/features/users/userSaga';
import adminGrocerySaga from 'admin/features/grocery/adminGrocerySaga';
import myDonationSaga from 'features/donations/mydonations/donationSaga';
import ReportsSaga from 'admin/features/reports/reportsSaga';
import adminBookingSaga from 'admin/features/bookings/bookingSaga';
import adminDonationSaga from 'admin/features/donations/donationSaga';
import adminStaticDataSaga from 'admin/features/sitemanager/siteManagerSaga';
import VoluteersSaga from 'features/volunteers/voluteersSaga';

export default function* rootSaga() {
    yield all(
        [
            StaffSaga(),
            contactSaga(),
            bannerSaga(),
            menuSaga(),
            serviceSaga(),
            eventsSaga(),
            bookingSaga(),
            advertismentSaga(),
            cartSaga(),
            aboutSaga(),
            authSaga(),
            registerSaga(),
            forgotpasswodSaga(),
            productsSaga(),
            adminmenuSaga(),
            AdminLayoutSaga(),
            adminProductSaga(),
            myProfileSaga(),
            adminGodSaga(),
            adminServiceSaga(),
            adminEventSaga(),
            adminContentSaga(),
            adminUserSaga(),
            adminGrocerySaga(),
            myDonationSaga(),
            ReportsSaga(),
            adminBookingSaga(),
            adminDonationSaga(),
            adminStaticDataSaga(),
            VoluteersSaga(),
        ],
    );
}
