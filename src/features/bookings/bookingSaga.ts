import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    getBookingList,
} from './bookingApi';
import { myBookingsActions } from './bookingSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';
import { BookingRes } from 'models';

function* getBookingDetails(action:any) {
    try {
        yield put(startLoading());
        const response: BookingRes = yield call(getBookingList, action.payload);
        if (response.success) {
            yield put(myBookingsActions.getBookingsSuccess(response));
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

export function* watchBookingDetails() {
    yield takeLatest(myBookingsActions.getBookings.type, getBookingDetails);
}

function* BookingsSaga() {
    yield all([fork(watchBookingDetails)]);
}

export default BookingsSaga;
