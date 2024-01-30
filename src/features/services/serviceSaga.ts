import {
    call, put, takeLatest, fork, all,
} from 'redux-saga/effects';
import { getServiceById, bookService } from './serviceApi';
import { serviceActions } from './serviceSlice';
import { ServerList, SuccesResponse } from 'models';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';

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

function* StoreService(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(bookService, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Service has booked successfully'));
            yield put(serviceActions.bookServiceSuccess(response));
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

export function* watchBookService() {
    yield takeLatest(serviceActions.bookService.type, StoreService);
}

function* ServiceSaga() {
    yield all([fork(watchServiceDetails), fork(watchBookService)]);
}

export default ServiceSaga;
