import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    addDonations, editDonations, deleteDonations, getDonationsDetails, getDonationById, getDonationByType,
} from './donationApis';
import { adminDonationTypeActions } from './donationSlice';
import {
    SuccesResponse, ServerList, DonationTypesSingle, BookingTypeList, DonationTypesList,
} from 'models';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/apiStatus/apiSlice';

/**
 * Retrieves a donation by its ID and dispatches appropriate actions based on the response.
 * @param action - The action object containing the payload.
 */
function* getDonationByIdRow(action:any) {
    try {
        yield put(startLoading());
        const response: DonationTypesSingle = yield call(getDonationById, action.payload);
        if (response.success) {
            yield put(adminDonationTypeActions.getDonationByIdSuccess(response));
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

/**
 * Retrieves a donation by type and updates the state accordingly.
 *
 * @param action - The action object containing the payload.
 */
function* getDonationByTypeRow(action:any) {
    try {
        yield put(startLoading());
        const response: DonationTypesSingle = yield call(getDonationByType, action.payload);
        if (response.success) {
            yield put(adminDonationTypeActions.getDonationByIdSuccess(response));
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

function* getDonationDetails(action:any) {
    try {
        yield put(startLoading());
        const response: DonationTypesList = yield call(getDonationsDetails, action.payload);
        if (response.success) {
            yield put(adminDonationTypeActions.getDonationDetailsSuccess(response));
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

function* addDonation(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(addDonations, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Added successfully'));
        } else {
            yield put(setError(response.errorMessage));
        }
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

function* updateDonation(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(editDonations, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Updated successfully'));
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

function* deleteDonation(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(deleteDonations, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Deleted successfully'));
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
    yield takeLatest(adminDonationTypeActions.getDonationDetails.type, getDonationDetails);
}

export function* watchAddDonation() {
    yield takeLatest(adminDonationTypeActions.addDonation.type, addDonation);
}
export function* watchupdateDonation() {
    yield takeLatest(adminDonationTypeActions.updateDonation.type, updateDonation);
}

export function* watchDonationById() {
    yield takeLatest(adminDonationTypeActions.getDonationById.type, getDonationByIdRow);
}

export function* watchDonationByType() {
    yield takeLatest(adminDonationTypeActions.getDonationByType.type, getDonationByTypeRow);
}

export function* watchdeleteDonation() {
    yield takeLatest(adminDonationTypeActions.deleteDonation.type, deleteDonation);
}
function* adminDonationSaga() {
    yield all([fork(watchDonationByType), fork(watchDonationById), fork(watchAddDonation), fork(watchupdateDonation), fork(watchdeleteDonation), fork(watchDonationDetails)]);
}

export default adminDonationSaga;
