import { call, put, takeLatest } from 'redux-saga/effects';
import { getMenuItems } from './menuApi';
import { adminmenuActions } from './menuSlice';
import { AdminMenuItemTypes, ListResponse } from 'models';

function* fetchmenuList() {
    try {
        const response: ListResponse<AdminMenuItemTypes> = yield call(getMenuItems, {});
        yield put(adminmenuActions.fetchMenuListSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch admin menu list', error);
            yield put(adminmenuActions.fetchMenuListFailed(error.message));
        }
    }
}

export default function* adminmenuSaga() {
    yield takeLatest(adminmenuActions.fetchMenuList.type, fetchmenuList);
}
