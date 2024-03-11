import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    addProducts, updateProducts, deleteproducts, getProductById, getProducts,
} from './adminProductApi';
import { adminProductActions } from './adminProductSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/apiStatus/apiSlice';
import { SuccesResponse, ProductSingleRes, ProductListRes } from 'models';

function* fetchproductList() {
    try {
        yield put(startLoading());
        const response: ProductListRes = yield call(getProducts);
        yield put(adminProductActions.fetchproductListSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

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
export function* watchFetchproductList() {
    yield takeLatest(adminProductActions.fetchproductList.type, fetchproductList);
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
    yield all([fork(watchFetchproductList), fork(WatchgetProductById), fork(watchAddProduct), fork(watchupdateProduct), fork(watchdeleteProduct)]);
}

export default adminProductSaga;
