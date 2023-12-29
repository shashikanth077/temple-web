import { call, put, takeLatest } from 'redux-saga/effects';
import { getProducts } from './productApi';
import { productActions } from './productSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';
import { ProductListRes } from 'models';

function* fetchproductList() {
    try {
        yield put(startLoading());
        const response: ProductListRes = yield call(getProducts);
        // yield put(setSuccessMessage('success'));
        yield put(productActions.fetchproductListSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

export default function* productSaga() {
    yield takeLatest(productActions.fetchproductList.type, fetchproductList);
}
