import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    addGods, editGods, deleteGods, getGodsDetails, getGodByIdDetails,
} from './godApis';
import { admingodActions } from './godSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/apiStatus/apiSlice';
import { SuccesResponse, GodList, GodSingleResponse } from 'models';

function* getGodById(action:any) {
    try {
        yield put(startLoading());
        const response: GodSingleResponse = yield call(getGodByIdDetails, action.payload);
        if (response.success) {
            yield put(admingodActions.getGodByIdSuccess(response));
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

function* getGodDetails(action:any) {
    try {
        yield put(startLoading());
        const response: GodList = yield call(getGodsDetails, action.payload);
        if (response.success) {
            yield put(admingodActions.getGodDetailsSuccess(response));
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

function* addGod(action:any) {
    try {
        const response: SuccesResponse = yield call(addGods, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Added successfully'));
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

function* updateGod(action:any) {
    try {
        const response: SuccesResponse = yield call(editGods, action.payload);
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

function* deleteGod(action:any) {
    try {
        const response: SuccesResponse = yield call(deleteGods, action.payload);
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

export function* watchGodDetails() {
    yield takeLatest(admingodActions.getGodDetails.type, getGodDetails);
}

export function* watchGodById() {
    yield takeLatest(admingodActions.getGodById.type, getGodById);
}

export function* watchAddGod() {
    yield takeLatest(admingodActions.addgod.type, addGod);
}
export function* watchupdateGod() {
    yield takeLatest(admingodActions.updategod.type, updateGod);
}

export function* watchdeleteGod() {
    yield takeLatest(admingodActions.deletegod.type, deleteGod);
}
function* adminGodSaga() {
    yield all([fork(watchGodById), fork(watchAddGod), fork(watchupdateGod), fork(watchdeleteGod), fork(watchGodDetails)]);
}

export default adminGodSaga;
