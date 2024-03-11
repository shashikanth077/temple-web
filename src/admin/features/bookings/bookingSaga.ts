import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    addBookings, editBookings, deleteBookings, getBookingsDetails, getBookingById,
} from './bookingApi';
import { adminBookingActions } from './bookingSlice';
import {
    SuccesResponse, BookingTypeList, BookinSingleList,
} from 'models';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/apiStatus/apiSlice';

function* getBookingByIdRow(action:any) {
    try {
        yield put(startLoading());
        const response: BookinSingleList = yield call(getBookingById, action.payload);
        if (response.success) {
            yield put(adminBookingActions.getBookingByIdSuccess(response));
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

function* getBookingDetails(action:any) {
    try {
        yield put(startLoading());
        const response: BookingTypeList = yield call(getBookingsDetails, action.payload);
        if (response.success) {
            yield put(adminBookingActions.getBookingDetailsSuccess(response));
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

function* addBooking(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(addBookings, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Added successfully'));
        } else {
            yield put(setError(response.errorMessage));
        }
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

function* updateBooking(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(editBookings, action.payload);
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

function* deleteBooking(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(deleteBookings, action.payload);
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

export function* watchBookingDetails() {
    yield takeLatest(adminBookingActions.getBookingDetails.type, getBookingDetails);
}

export function* watchAddBooking() {
    yield takeLatest(adminBookingActions.addBooking.type, addBooking);
}
export function* watchupdateBooking() {
    yield takeLatest(adminBookingActions.updateBooking.type, updateBooking);
}

export function* watchBookingById() {
    yield takeLatest(adminBookingActions.getBookingById.type, getBookingByIdRow);
}

export function* watchdeleteBooking() {
    yield takeLatest(adminBookingActions.deleteBooking.type, deleteBooking);
}
function* adminBookingSaga() {
    yield all([fork(watchBookingById), fork(watchAddBooking), fork(watchupdateBooking), fork(watchdeleteBooking), fork(watchBookingDetails)]);
}

export default adminBookingSaga;
