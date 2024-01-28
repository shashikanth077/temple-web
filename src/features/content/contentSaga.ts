import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    getContents,
} from './contentApi';
import { admincontentActions } from './contentSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';
import { Content } from 'models';

function* getStaticContent(action:any) {
    try {
        yield put(startLoading());
        const response: Content = yield call(getContents, action.payload);
        if (response.success) {
            yield put(admincontentActions.getStaticContentSuccess(response));
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

export function* watchStaticContent() {
    yield takeLatest(admincontentActions.getStaticContent.type, getStaticContent);
}

function* adminContentSaga() {
    yield all([fork(watchStaticContent)]);
}

export default adminContentSaga;
