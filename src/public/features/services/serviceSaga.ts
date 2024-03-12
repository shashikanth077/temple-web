import {
    call, put, takeLatest, fork, all,
} from 'redux-saga/effects';
import { getServiceById } from './serviceApi';
import { serviceActions } from './serviceSlice';
import { ServerList, SuccesResponse } from 'models';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/apiStatus/apiSlice';

function* getServiceByGodId(action:any) {
    try {
        yield put(startLoading());
        const response: ServerList = yield call(getServiceById, action.payload);
        if (response.success) {
            yield put(serviceActions.fetchServiceListSuccess(response));
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

export function* watchServiceDetails() {
    yield takeLatest(serviceActions.getServices.type, getServiceByGodId);
}

function* ServiceSaga() {
    yield all([fork(watchServiceDetails)]);
}

export default ServiceSaga;
