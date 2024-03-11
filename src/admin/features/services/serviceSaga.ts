import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    addServices, editServices, deleteServices, getServicesDetails, getServiceById,
} from './serviceApi';
import { adminServiceActions } from './serviceSlice';
import { SuccesResponse, ServerList, ServerSingleList } from 'models';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/apiStatus/apiSlice';

function* getServiceByIdRow(action:any) {
    try {
        yield put(startLoading());
        const response: ServerSingleList = yield call(getServiceById, action.payload);
        if (response.success) {
            yield put(adminServiceActions.getServiceByIdSuccess(response));
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

function* getServiceDetails(action:any) {
    try {
        yield put(startLoading());
        const response: ServerList = yield call(getServicesDetails, action.payload);
        if (response.success) {
            yield put(adminServiceActions.getServiceDetailsSuccess(response));
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

function* addService(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(addServices, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Added successfully'));
        } else {
            yield put(setError(response.errorMessage));
        }
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

function* updateService(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(editServices, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Updated successfully'));
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

function* deleteService(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(deleteServices, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Deleted successfully'));
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
    yield takeLatest(adminServiceActions.getServiceDetails.type, getServiceDetails);
}

export function* watchAddService() {
    yield takeLatest(adminServiceActions.addService.type, addService);
}
export function* watchupdateService() {
    yield takeLatest(adminServiceActions.updateService.type, updateService);
}

export function* watchServiceById() {
    yield takeLatest(adminServiceActions.getServiceById.type, getServiceByIdRow);
}

export function* watchdeleteService() {
    yield takeLatest(adminServiceActions.deleteService.type, deleteService);
}
function* adminServiceSaga() {
    yield all([fork(watchServiceById), fork(watchAddService), fork(watchupdateService), fork(watchdeleteService), fork(watchServiceDetails)]);
}

export default adminServiceSaga;
