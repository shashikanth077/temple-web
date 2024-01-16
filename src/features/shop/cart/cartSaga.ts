import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import { cartActions } from './cartSlice';
import {
    getCartDetails, AddtoCart, deleteCart,
} from './cartApi';
import { Cart, AddtoCartRes, ListResponse } from 'models';

function* fetchecurrentcartList(action:any) {
    try {
        const response: ListResponse<Cart> = yield call(getCartDetails, action.payload);
        yield put(cartActions.getCartDetailsSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch current cart list', error);
            yield put(cartActions.getCartDetailFailure(error.message));
        }
    }
}

function* AddtoCartProduct(action:any) {
    try {
        const response: ListResponse<AddtoCartRes> = yield call(AddtoCart, action.payload);
        yield put(cartActions.addtoCartItemSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to add item to cart', error);
            yield put(cartActions.addtoCartItemFailure(error.message));
        }
    }
}

function* deleteProductFromCart(action:any) {
    try {
        const response: ListResponse<AddtoCartRes> = yield call(deleteCart, action.payload);
        yield put(cartActions.deleteFromCartSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch current cart list', error);
            yield put(cartActions.deleteFromCartFailure(error.message));
        }
    }
}

export function* watchGetCartDetails() {
    yield takeLatest(cartActions.getCartDetails.type, fetchecurrentcartList);
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
    ]);
}

export default cartSaga;
