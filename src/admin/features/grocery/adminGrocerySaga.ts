import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    addGrocerys, updateGrocerys, deleteGrocerys, getGroceryById, getAllGroceries,
} from './adminGroceryApi';
import { adminGroceryActions } from './adminGrocerySlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/apiStatus/apiSlice';
import { SuccesResponse, GrocerySingleRes, GroceryListRes } from 'models';

function* getGroceryByDetails(action:any) {
    try {
        yield put(startLoading());
        const response: GroceryListRes = yield call(getAllGroceries, action.payload);
        if (response.success) {
            // yield put(setSuccessMessage('Success'));
            yield put(adminGroceryActions.getAllGroceriesSuccess(response));
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

function* getGroceryByIdRow(action:any) {
    try {
        yield put(startLoading());
        const response: GrocerySingleRes = yield call(getGroceryById, action.payload);
        if (response.success) {
            // yield put(setSuccessMessage('Success'));
            yield put(adminGroceryActions.getGroceryByIdSuccess(response));
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

function* addGrocery(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(addGrocerys, action.payload);
        if (response.success) {
            yield put(setSuccessMessage(response.message));
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

function* updateGrocery(action:any) {
    console.log('Grocery edit paylod', action.payload);
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(updateGrocerys, action.payload);
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

function* deleteGrocery(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(deleteGrocerys, action.payload);
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

export function* watchAddGrocery() {
    yield takeLatest(adminGroceryActions.addGrocery.type, addGrocery);
}

export function* watchGetAllGroceries() {
    yield takeLatest(adminGroceryActions.getAllGroceries.type, getGroceryByDetails);
}

export function* watchupdateGrocery() {
    yield takeLatest(adminGroceryActions.updateGrocery.type, updateGrocery);
}
export function* WatchgetGroceryById() {
    yield takeLatest(adminGroceryActions.getGroceryById.type, getGroceryByIdRow);
}
export function* watchdeleteGrocery() {
    yield takeLatest(adminGroceryActions.deleteGrocery.type, deleteGrocery);
}

function* adminGrocerySaga() {
    yield all([fork(watchGetAllGroceries), fork(WatchgetGroceryById), fork(watchAddGrocery), fork(watchupdateGrocery), fork(watchdeleteGrocery)]);
}

export default adminGrocerySaga;
