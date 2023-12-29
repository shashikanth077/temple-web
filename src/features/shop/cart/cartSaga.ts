import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import { cartActions } from './cartSlice';
import {
    getCartDetails, AddtoCart, deleteCart, decreaseQty,
} from './cartApi';
import { Cart, AddtoCartRes, ListResponse } from 'models';

function* fetchecurrentcartList() {
    try {
        const response: ListResponse<Cart> = yield call(getCartDetails, {});
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
        console.log('saga', action.payload);
        // logic for cart cal
        const cartItem = action.payload.currentCart.list.products.find((item:any) => item.productid === action.payload.productid);
        console.log('current cart items', action.payload.currentCart.list);
        console.log('current product id', action.payload.productid);
        console.log('updated cart items', cartItem);
        const cartItems = [];
        if (!cartItem) {
            console.log('if not cart item exits', action.payload.productid);
            cartItems.push({
                userid: 0, // will replace with store data later
                token: '334535', // will replace later
                productid: action.payload.productid,
                quantity: action.payload.quantity ? action.payload.quantity : 5,
            });
        } else {
            const currentCartId = action.payload.currentCart.list.cart_id;
            if (currentCartId === cartItem.cart_id) {
                console.log('if item exits');
                return {
                    userid: 1, // will replace with store data later
                    token: '334535', // will replace later
                    productid: action.payload.productid,
                    quantity: action.payload.quantity ? currentCartId.quantity + action.payload.quantity : currentCartId.quantity + 1,
                };
            }
        }
        const requestPayload = {
            cartDetails: cartItems,
        };
        console.log('final payload', requestPayload);
        const response: ListResponse<AddtoCartRes> = yield call(AddtoCart, requestPayload);
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

function* decreaseQuantity(action:any) {
    try {
        const response: ListResponse<AddtoCartRes> = yield call(decreaseQty, action.payload);
        yield put(cartActions.descreaseQtySuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to descrease qty', error);
            yield put(cartActions.decreaseQtyFailure(error.message));
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

export function* watchdecreaseQuantity() {
    yield takeLatest(cartActions.decreaseQuantity.type, decreaseQuantity);
}

function* cartSaga() {
    yield all([
        fork(watchGetCartDetails),
        fork(watchAddtoCart),
        fork(watchdeleteProductFromCart),
        fork(watchdecreaseQuantity)]);
}

export default cartSaga;
