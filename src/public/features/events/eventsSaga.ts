import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import { getEvents, bookEvent, getEventsByFilter } from './eventsApi';
import { eventsActions } from './eventsSlice';
import { EventListRes } from 'models';
import {
    startLoading, endLoading, setError,
} from 'storeConfig/apiStatus/apiSlice';

function* fetcheventsList() {
    try {
        yield put(startLoading());
        const response: EventListRes = yield call(getEvents);
        if (response.success) {
            yield put(eventsActions.fetchEventListSuccess(response));
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

function* fetcheventsListByFilter() {
    try {
        yield put(startLoading());
        const response: EventListRes = yield call(getEventsByFilter);
        if (response.success) {
            yield put(eventsActions.fetchEventListByFilterSuccess(response));
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

function* storeEventBookHistory(action:any) {
    try {
        yield put(startLoading());
        const response: EventListRes = yield call(bookEvent, action.payload);
        if (response.success) {
            // yield put(setSuccessMessage('Success'));
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

export function* watchEventsDetails() {
    yield takeLatest(eventsActions.fetchEvents.type, fetcheventsList);
}

export function* watchStoreEventDetails() {
    yield takeLatest(eventsActions.confirmPayment.type, storeEventBookHistory);
}

export function* watchFetcheventsListByFilter() {
    yield takeLatest(eventsActions.fetchEventByFilter.type, fetcheventsListByFilter);
}

function* eventSaga() {
    yield all([fork(watchEventsDetails), fork(watchStoreEventDetails), fork(watchFetcheventsListByFilter)]);
}

export default eventSaga;
