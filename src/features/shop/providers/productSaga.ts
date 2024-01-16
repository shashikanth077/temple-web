import {
    call, put, takeLatest, fork, all,
} from 'redux-saga/effects';
import { getProducts, getProductById } from './productApi';
import { productActions } from './productSlice';
import {
    startLoading, endLoading, setError,
} from 'storeConfig/api/apiSlice';
import { ProductListRes, ProductSingleRes } from 'models';

function* fetchproductList() {
    try {
        yield put(startLoading());
        const response: ProductListRes = yield call(getProducts);
        yield put(productActions.fetchproductListSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

function* fetchProductById(action:any) {
    try {
        yield put(startLoading());
        const response: ProductSingleRes = yield call(getProductById, action.payload);
        yield put(productActions.fetchproductSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

export function* watchProductById() {
    yield takeLatest(productActions.fetchproduct.type, fetchProductById);
}

export function* watchproductSaga() {
    yield takeLatest(productActions.fetchproductList.type, fetchproductList);
}

function* ShopSaga() {
    yield all([fork(watchProductById), fork(watchproductSaga)]);
}

export default ShopSaga;
