import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    getReportList,
} from './reportsApis';
import { adminReportsActions } from './reportsSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';
import { ReportsRes } from 'models';

function* getReportsDetails(action:any) {
    try {
        yield put(startLoading());
        const response: ReportsRes = yield call(getReportList, {});
        if (response.success) {
            yield put(adminReportsActions.getReportsSuccess(response));
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

export function* watchReportsDetails() {
    yield takeLatest(adminReportsActions.getReports.type, getReportsDetails);
}

function* IncomeReportsaga() {
    yield all([fork(watchReportsDetails)]);
}

export default IncomeReportsaga;
