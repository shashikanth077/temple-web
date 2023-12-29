import { call, put, takeLatest } from 'redux-saga/effects';
import { getAboutDetails } from './aboutApis';
import { AboutsActions } from './aboutSlice';
import { About, ListResponse } from 'models';

function* fetchaboutList() {
    try {
        const response: ListResponse<About> = yield call(getAboutDetails, {});
        yield put(AboutsActions.fetchAboutListSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch about list', error);
            yield put(AboutsActions.fetchAboutListFailed(error.message));
        }
    }
}

export default function* aboutSaga() {
    yield takeLatest(AboutsActions.fetchAboutList.type, fetchaboutList);
}
