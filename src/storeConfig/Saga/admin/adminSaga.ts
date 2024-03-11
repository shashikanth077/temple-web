import { all } from 'redux-saga/effects';
import adminmenuSaga from 'admin/layout/menu/menuSaga';
import AdminLayoutSaga from 'admin/layout/layoutSaga';
import adminProductSaga from 'admin/features/products/adminProductSaga';
import myProfileSaga from 'admin/features/myprofile/myprofileSaga';
import adminGodSaga from 'admin/features/godmaster/godSaga';
import adminServiceSaga from 'admin/features/services/serviceSaga';
import adminEventSaga from 'admin/features/events/adminEventSaga';
import adminUserSaga from 'admin/features/users/userSaga';
import adminGrocerySaga from 'admin/features/grocery/adminGrocerySaga';
import ReportsSaga from 'admin/features/reports/reportsSaga';
import adminBookingSaga from 'admin/features/bookings/bookingSaga';
import adminDonationSaga from 'admin/features/donations/donationSaga';
import adminStaticDataSaga from 'admin/features/sitemanager/siteManagerSaga';
import adminVolunteersSaga from 'admin/features/volunteers/volunteerSaga';

export default function* AdminSaga() {
    yield all([
        adminmenuSaga(),
        AdminLayoutSaga(),
        adminProductSaga(),
        myProfileSaga(),
        adminGodSaga(),
        adminServiceSaga(),
        adminEventSaga(),
        ReportsSaga(),
        adminUserSaga(),
        adminGrocerySaga(),
        adminBookingSaga(),
        adminDonationSaga(),
        adminStaticDataSaga(),
        adminVolunteersSaga(),
    ]);
}
