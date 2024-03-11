import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    getDonationList, getStripeSessionId, storeDonationHistory,
} from './donationApis';
import { mydonationsActions } from './donationSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/apiStatus/apiSlice';
import { DonationRes, DonationSingleRes, Donation } from 'models';

function* getDonationDetails(action:any) {
    try {
        yield put(startLoading());
        const response: DonationRes = yield call(getDonationList, action.payload);
        if (response.success) {
            yield put(mydonationsActions.getDonationsSuccess(response));
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

function* getStripeSessionIdDetails(action:any) {
    try {
        yield put(startLoading());
        const response: DonationRes = yield call(getStripeSessionId, action.payload);
        if (response.success) {
            yield put(mydonationsActions.getSessionIdSuccess(response));
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

function* storeDonationHistoryData(action:any) {
    try {
        yield put(startLoading());
        const response: DonationRes = yield call(storeDonationHistory, action.payload);
        if (response.success) {
            // yield put(mydonationsActions.getSessionIdSuccess(response));
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

export function* watchDonationDetails() {
    yield takeLatest(mydonationsActions.getDonations.type, getDonationDetails);
}

export function* watchgetStripeSessionIdDetails() {
    yield takeLatest(mydonationsActions.getSessionId.type, getStripeSessionIdDetails);
}

export function* watchstoreDonationHistoryData() {
    yield takeLatest(mydonationsActions.PayDonation.type, storeDonationHistoryData);
}

function* myDonationSaga() {
    yield all([fork(watchDonationDetails), fork(watchgetStripeSessionIdDetails), fork(watchstoreDonationHistoryData)]);
}

export default myDonationSaga;
