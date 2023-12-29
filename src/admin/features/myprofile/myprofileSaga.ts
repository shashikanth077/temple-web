import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    addDeasedRow, editDeasedRow, deleteDeceasedRow, getMyProfileDetails, updateProfiles, getDeasedIdData, addFamily, editFamily, deleteFamily, getFamilyIdData,
} from './myprofileApi';
import { myprofileActions } from './myProfileSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';
import { DeasedSingleResponse, FamilySingleResponse, SuccesResponse } from 'models';

function* getDeseasedPersonId(action:any) {
    try {
        yield put(startLoading());
        const response: DeasedSingleResponse = yield call(getDeasedIdData, action.payload);
        if (response.errorCode !== undefined) {
            yield put(myprofileActions.getDeceasedByIdFailure(response.errorMessage));
        } else {
            yield put(myprofileActions.getDeceasedByIdSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to deceased', error);
            yield put(myprofileActions.getDeceasedByIdFailure(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

function* editDeasedPerson(action:any) {
    try {
        const response: SuccesResponse = yield call(editDeasedRow, action.payload);
        if (response.errorCode !== undefined) {
            yield put(myprofileActions.addDeceasedFailure(response.errorMessage));
        } else {
            yield put(myprofileActions.addDeceasedSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to addfamily', error);
            yield put(myprofileActions.addFamilyFailure(error.message));
        }
    }
}

function* deleteDeasedRow(action:any) {
    try {
        const response: SuccesResponse = yield call(deleteDeceasedRow, action.payload);
        if (response.errorCode !== undefined) {
            yield put(myprofileActions.deleteDeceasedFailure(response.errorMessage));
        } else {
            yield put(myprofileActions.deleteDeceasedSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to addfamily', error);
            yield put(myprofileActions.addFamilyFailure(error.message));
        }
    }
}

function* addDeasedMember(action:any) {
    try {
        const response: SuccesResponse = yield call(addDeasedRow, action.payload);
        if (response.errorCode !== undefined) {
            yield put(myprofileActions.addDeceasedFailure(response.errorMessage));
        } else {
            yield put(myprofileActions.addDeceasedSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to addfamily', error);
            yield put(myprofileActions.addDeceasedFailure(error.message));
        }
    }
}

function* getFamilyId(action:any) {
    try {
        const response: FamilySingleResponse = yield call(getFamilyIdData, action.payload);
        if (response.errorCode !== undefined) {
            yield put(myprofileActions.getFamilByIdFailure(response.errorMessage));
        } else {
            yield put(myprofileActions.getFamilByIdSuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to addfamily', error);
            yield put(myprofileActions.addFamilyFailure(error.message));
        }
    }
}

function* editFamilyMember(action:any) {
    try {
        const response: SuccesResponse = yield call(editFamily, action.payload);
        if (response.errorCode !== undefined) {
            yield put(myprofileActions.updateFamilyFailure(response.errorMessage));
        } else {
            yield put(myprofileActions.updateFamilySuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to addfamily', error);
            yield put(myprofileActions.addFamilyFailure(error.message));
        }
    }
}

function* deleteFamilyRow(action:any) {
    try {
        const response: SuccesResponse = yield call(deleteFamily, action.payload);
        if (response.errorCode !== undefined) {
            yield put(myprofileActions.updateFamilyFailure(response.errorMessage));
        } else {
            yield put(myprofileActions.updateFamilySuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to addfamily', error);
            yield put(myprofileActions.addFamilyFailure(error.message));
        }
    }
}

function* addFamilyMember(action:any) {
    try {
        const response: SuccesResponse = yield call(addFamily, action.payload);
        if (response.errorCode !== undefined) {
            yield put(myprofileActions.addFamilyFailure(response.errorMessage));
        } else {
            yield put(myprofileActions.addFamilySuccess(response));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to addfamily', error);
            yield put(myprofileActions.addFamilyFailure(error.message));
        }
    }
}

function* fetchMyprofileDetails(action:any) {
    try {
        const response: SuccesResponse = yield call(getMyProfileDetails, action.payload);
        console.log('fetchMyprofileDetails', response);
        if (response.success) {
            console.log('fetchMyprofileDetails', response);
            yield put(myprofileActions.myProfileDetailsSuccess(response));
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

function* updateProfile(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(updateProfiles, action.payload);
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

export function* watchMyprofileDetails() {
    yield takeLatest(myprofileActions.getMyProfileDetails.type, fetchMyprofileDetails);
}

export function* watchUpdateProfile() {
    yield takeLatest(myprofileActions.updateProfile.type, updateProfile);
}

export function* watchUpdateFamily() {
    yield takeLatest(myprofileActions.updateFamily.type, editFamilyMember);
}

export function* watchfamilyDetailsByid() {
    yield takeLatest(myprofileActions.getFamilById.type, getFamilyId);
}

export function* watchAddFamily() {
    yield takeLatest(myprofileActions.addFamily.type, addFamilyMember);
}
export function* watchDeleteFamily() {
    yield takeLatest(myprofileActions.deleteFamily.type, deleteFamilyRow);
}

export function* watchAddDeased() {
    yield takeLatest(myprofileActions.addDeceased.type, addDeasedRow);
}
export function* watchDeleteDeased() {
    yield takeLatest(myprofileActions.deleteDeceased.type, deleteDeceasedRow);
}

export function* watchEditDeased() {
    yield takeLatest(myprofileActions.updateDeceased.type, editDeasedPerson);
}

function* myProfileSaga() {
    yield all([fork(watchDeleteFamily), fork(watchfamilyDetailsByid), fork(watchMyprofileDetails), fork(watchUpdateProfile), fork(watchAddFamily), fork(watchUpdateFamily)]);
}

export default myProfileSaga;
