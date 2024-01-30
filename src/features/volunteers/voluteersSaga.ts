import {
    call, put, takeLatest, fork, all,
} from 'redux-saga/effects';
import { InsertVolunteers } from './volunteersApis';
import { volunteerActions } from './volunteersSlice';
import { SuccesResponse } from 'models';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';

function* InsertVolunteerData(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(InsertVolunteers, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Submitted successfully'));
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

export function* watchInsertVolunteerData() {
    yield takeLatest(volunteerActions.storeVolunteers.type, InsertVolunteerData);
}

function* VoluteersSaga() {
    yield all([fork(watchInsertVolunteerData)]);
}

export default VoluteersSaga;
