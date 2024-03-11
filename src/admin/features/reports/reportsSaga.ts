import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    getReportList,
} from './reportsApis';
import { adminReportsActions } from './reportsSlice';
import {
    startLoading, endLoading, setError,
} from 'storeConfig/apiStatus/apiSlice';
import { ReportsRes } from 'models';

function* getReportsDetails(action:any) {
    try {
        yield put(startLoading());
        const response: ReportsRes = yield call(getReportList, action.payload);
        if (response.success) {
            yield put(adminReportsActions.getReportsSuccess(response));
        } else {
            yield put(adminReportsActions.getReportsSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

export function* watchReportsDetails() {
    yield takeLatest(adminReportsActions.getReports.type, getReportsDetails);
}

function* IncomeReportsaga() {
    yield all([fork(watchReportsDetails)]);
}

export default IncomeReportsaga;
