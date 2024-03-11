import { all } from 'redux-saga/effects';
import adminSaga from './admin/adminSaga';
import memberSaga from './member/memberSaga';
import publicSaga from './public/publicSaga';

export default function* AdminSaga() {
    yield all([
        adminSaga(),
        memberSaga(),
        publicSaga(),
    ]);
}
