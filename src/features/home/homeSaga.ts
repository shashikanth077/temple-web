import { call, put, takeLatest } from 'redux-saga/effects';
import { Banner, ListResponse } from '../../models';
import { bannerApi } from './homeApi';
import { bannerActions } from './homeSlice';

function* fetchbannerList() {
    try {
        const response: ListResponse<Banner> = yield call(bannerApi.getAll);
        yield put(bannerActions.fetchBannerListSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch banner list', error);
            yield put(bannerActions.fetchBannerListFailed(error.message));
        }
    }
}

export default function* bannerSaga() {
    yield takeLatest(bannerActions.fetchBannerList.type, fetchbannerList);
}
