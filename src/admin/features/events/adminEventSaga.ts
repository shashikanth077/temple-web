import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    addEvent, updateEvent, deleteEvent, getEventById,
} from './adminEventApis';
import { adminEventActions } from './adminEventSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';
import { SuccesResponse, EventSingleRes } from 'models';

function* getEventByIdRow(action:any) {
    try {
        yield put(startLoading());
        const response: EventSingleRes = yield call(getEventById, action.payload);
        if (response.success) {
            // yield put(setSuccessMessage('success'));
            yield put(adminEventActions.getEventByIdSuccess(response));
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

function* addEvents(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(addEvent, action.payload);

        if (response.success) {
            yield put(setSuccessMessage('Added successfully'));
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

function* updateEvents(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(updateEvent, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Updated successfully'));
        } else {
            yield put(setError(response.errorMessage));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch admin edit Event', error);
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

function* deleteEvents(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(deleteEvent, action.payload);
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

export function* watchAddEvent() {
    yield takeLatest(adminEventActions.addEvent.type, addEvents);
}
export function* watchupdateEvent() {
    yield takeLatest(adminEventActions.updateEvent.type, updateEvents);
}
export function* WatchgetEventById() {
    yield takeLatest(adminEventActions.getEventById.type, getEventByIdRow);
}
export function* watchdeleteEvent() {
    yield takeLatest(adminEventActions.deleteEvent.type, deleteEvents);
}

function* adminEventSaga() {
    yield all([fork(WatchgetEventById), fork(watchAddEvent), fork(watchupdateEvent), fork(watchdeleteEvent)]);
}

export default adminEventSaga;
