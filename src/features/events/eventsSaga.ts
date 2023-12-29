import { call, put, takeLatest } from 'redux-saga/effects';
import { EventListRes } from '../../models';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from '../../storeConfig/api/apiSlice';
import { getEvents } from './eventsApi';
import { eventsActions } from './eventsSlice';

function* fetcheventsList() {
    try {
        yield put(startLoading());
        const response: EventListRes = yield call(getEvents);
        if (response.success) {
            // yield put(setSuccessMessage('Success'));
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

export default function* eventsSaga() {
    yield takeLatest(eventsActions.fetchEvents.type, fetcheventsList);
}
