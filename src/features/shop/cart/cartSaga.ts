import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import { cartActions } from './cartSlice';
import {
    getCartDetails, AddtoCart, deleteCart, InsertShopDetails,
} from './cartApi';
import {
    Cart, AddtoCartRes, ListResponse, SuccesResponse,
} from 'models';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';

function* fetchecurrentcartList(action:any) {
    try {
        yield put(startLoading());
        const response: ListResponse<Cart> = yield call(getCartDetails, action.payload);
        yield put(cartActions.getCartDetailsSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

function* AddtoCartProduct(action:any) {
    try {
        yield put(startLoading());
        const response: ListResponse<AddtoCartRes> = yield call(AddtoCart, action.payload);
        yield put(cartActions.addtoCartItemSuccess(response));
        yield put(setSuccessMessage('Added to cart'));
    } catch (error) {
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

function* AddShopDetails(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(InsertShopDetails, action.payload);
        if (response.success) {
            yield put(cartActions.AddShopDetailSuccess(response));
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

function* deleteProductFromCart(action:any) {
    try {
        yield put(startLoading());
        const response: ListResponse<AddtoCartRes> = yield call(deleteCart, action.payload);
        yield put(cartActions.deleteFromCartSuccess(response));
        yield put(setSuccessMessage('Product deleted'));
    } catch (error) {
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

export function* watchGetCartDetails() {
    yield takeLatest(cartActions.getCartDetails.type, fetchecurrentcartList);
}

export function* watchAddShopDetails() {
    yield takeLatest(cartActions.AddShopDetails.type, AddShopDetails);
}

export function* watchAddtoCart() {
    yield takeLatest(cartActions.addtoCartItems.type, AddtoCartProduct);
}

export function* watchdeleteProductFromCart() {
    yield takeLatest(cartActions.deleteFromCart.type, deleteProductFromCart);
}

function* cartSaga() {
    yield all([
        fork(watchGetCartDetails),
        fork(watchAddtoCart),
        fork(watchdeleteProductFromCart),
        fork(watchAddShopDetails),
    ]);
}

export default cartSaga;
