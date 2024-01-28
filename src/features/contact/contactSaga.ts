import {
    call, put, fork, all, takeLatest,
} from 'redux-saga/effects';
import { SingleResponse } from '../../models/common';
import { sendContact } from './contactApi';
import { sendcontactActions } from './contactSlice';
import { SuccesResponse } from 'models';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';

function* sendContactInfo(action:any) {
    try {
        yield put(startLoading());
        const response: SingleResponse<SuccesResponse> = yield call(sendContact, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Enquiry submitted successfylly'));
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

export function* watchsendContactInfo() {
    yield takeLatest(sendcontactActions.sendContactInfo, sendContactInfo);
}

function* ContactSaga() {
    yield all([fork(watchsendContactInfo)]);
}

export default ContactSaga;
