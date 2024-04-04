import {
    call, put, takeLatest, fork, all,
} from 'redux-saga/effects';
import { getServiceById, getServices } from './serviceApi';
import { serviceActions } from './serviceSlice';
import { ServerList } from 'models';
import {
    startLoading, endLoading, setError,
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

function* getAllServices() {
    try {
        yield put(startLoading());
        const response: ServerList = yield call(getServices);
        if (response.success) {
            yield put(serviceActions.fetchAllServiceListSuccess(response));
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
export function* watchGetAllServices() {
    yield takeLatest(serviceActions.getAllServices.type, getAllServices);
}

function* ServiceSaga() {
    yield all([fork(watchServiceDetails), fork(watchGetAllServices)]);
}

export default ServiceSaga;
