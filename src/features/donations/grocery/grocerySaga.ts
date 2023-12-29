// import {
//     call, put, takeLatest, all, fork,
// } from 'redux-saga/effects';
// import { groceryDonateAction } from './grocerySlice';
// import { CartPayload, CartRes } from 'models';

// import {
//     startLoading, endLoading, setError, setSuccessMessage,
// } from 'storeConfig/api/apiSlice';

// /* eslint no-underscore-dangle: 0 */
// function* AddGrocerytoCart(payload:any) {
//     try {
//         yield put(startLoading());
//         yield put(groceryDonateAction.addToCartSuccess(payload.pay));
//     } catch (error) {
//         if (error instanceof Error) {
//             yield put(setError(error.message));
//         }
//     } finally {
//         yield put(endLoading());
//     }
// }

// export function* watchAddtoCart() {
//     yield takeLatest(groceryDonateAction.addToCartItem.type, AddGrocerytoCart);
// }

// function* GroceryCartSaga() {
//     yield all([fork(watchAddtoCart)]);
// }

// export default GroceryCartSaga;

export {};
