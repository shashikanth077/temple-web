import { call, put, takeLatest } from 'redux-saga/effects';
import { Adversiments, ListResponse } from '../../models';
import { adsApi } from './adversimentsApi';
import { adsActions } from './adversimentsSlice';

function* fetchadsList() {
    try {
        const response: ListResponse<Adversiments> = yield call(adsApi.getAll);
        yield put(adsActions.fetchAdsListSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch ads list', error);
            yield put(adsActions.fetchAdsListFailed(error.message));
        }
    }
}

export default function* advertismentSaga() {
    yield takeLatest(adsActions.fetchAdsList.type, fetchadsList);
}
