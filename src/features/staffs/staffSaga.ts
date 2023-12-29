import { call, put, takeLatest } from 'redux-saga/effects';
import { Staff, ListResponse } from '../../models';
import { staffApi } from './staffApi';
import { staffActions } from './staffSlice';

function* fetchStaffList() {
    try {
        const response: ListResponse<Staff> = yield call(staffApi.getAll);
        yield put(staffActions.fetchStaffListSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch Staff list', error);
            yield put(staffActions.fetchStaffListFailed(error.message));
        }
    }
}

export default function* StaffSaga() {
    yield takeLatest(staffActions.fetchStaffList.type, fetchStaffList);
}
