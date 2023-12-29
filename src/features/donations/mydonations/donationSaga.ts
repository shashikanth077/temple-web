import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    getDonationList,
} from './donationApis';
import { mydonationsActions } from './donationSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';
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

export function* watchDonationDetails() {
    yield takeLatest(mydonationsActions.getDonations.type, getDonationDetails);
}

function* myDonationSaga() {
    yield all([fork(watchDonationDetails)]);
}

export default myDonationSaga;
