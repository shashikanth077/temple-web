import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    getVolunteersData, volunteerApprove,
} from './volunteerApis';
import { adminVolunteersActions } from './volunteerSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/apiStatus/apiSlice';
import { VoluteersRes } from 'models';

function* getVolunteersDetails(action:any) {
    try {
        yield put(startLoading());
        const response: VoluteersRes = yield call(getVolunteersData, action.payload);
        if (response.success) {
            yield put(adminVolunteersActions.getvolunteersDetailsSuccess(response));
        } else {
            yield put(setError(response.errorMessage));
        }
    } catch (error) {
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

function* updateVolunteerStatus(action:any) {
    try {
        yield put(startLoading());
        const response: VoluteersRes = yield call(volunteerApprove, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Volunteer status updated successfully!'));
            yield put(adminVolunteersActions.getVolunteers());
        } else {
            yield put(setError(response.errorMessage));
        }
    } catch (error) {
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

export function* watchVolunteersDetails() {
    yield takeLatest(adminVolunteersActions.getVolunteers.type, getVolunteersDetails);
}
export function* watchupdateVolunteerStatus() {
    yield takeLatest(adminVolunteersActions.updateVolunteer.type, updateVolunteerStatus);
}

function* adminVolunteersSaga() {
    yield all([fork(watchVolunteersDetails), fork(watchupdateVolunteerStatus)]);
}

export default adminVolunteersSaga;
