import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    getStaticContentDetails, UploadStaticFile,
} from './siteManagerApis';
import { adminSiteManagerActions } from './siteManagerSlice';
import { SiteResponse } from 'models';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';

function* getStatiContentData(action:any) {
    try {
        yield put(startLoading());
        const response: SiteResponse = yield call(getStaticContentDetails, action.payload);
        if (response.success) {
            yield put(adminSiteManagerActions.getStatiContentDetailsSuccess(response));
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

function* uploadStatic(action:any) {
    try {
        yield put(startLoading());
        const response: SiteResponse = yield call(UploadStaticFile, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Uploaded static file successfully'));
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

export function* watchgetStatiContentData() {
    yield takeLatest(adminSiteManagerActions.getStatiContentDetails.type, getStatiContentData);
}

export function* watchuploadStatic() {
    yield takeLatest(adminSiteManagerActions.uploadStaticData.type, uploadStatic);
}

function* adminStaticDataSaga() {
    yield all([fork(watchgetStatiContentData), fork(watchuploadStatic)]);
}

export default adminStaticDataSaga;
