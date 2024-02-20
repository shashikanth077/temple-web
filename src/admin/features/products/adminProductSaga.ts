import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    addProducts, updateProducts, deleteproducts, getProductById,
} from './adminProductApi';
import { adminProductActions } from './adminProductSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';
import { SuccesResponse, ProductSingleRes } from 'models';

function* getProductByIdRow(action:any) {
    try {
        yield put(startLoading());
        const response: ProductSingleRes = yield call(getProductById, action.payload);
        if (response.success) {
            yield put(adminProductActions.getProductByIdSuccess(response));
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

function* addProduct(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(addProducts, action.payload);
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

function* updateProduct(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(updateProducts, action.payload);
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

function* deleteProduct(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(deleteproducts, action.payload);
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

export function* watchAddProduct() {
    yield takeLatest(adminProductActions.addProduct.type, addProduct);
}
export function* watchupdateProduct() {
    yield takeLatest(adminProductActions.updateProduct.type, updateProduct);
}
export function* WatchgetProductById() {
    yield takeLatest(adminProductActions.getProductById.type, getProductByIdRow);
}
export function* watchdeleteProduct() {
    yield takeLatest(adminProductActions.deleteProduct.type, deleteProduct);
}

function* adminProductSaga() {
    yield all([fork(WatchgetProductById), fork(watchAddProduct), fork(watchupdateProduct), fork(watchdeleteProduct)]);
}

export default adminProductSaga;
