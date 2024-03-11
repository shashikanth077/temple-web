import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    addDeasedRow, getDeceasedList, getFamilyList, editDeasedRow, deleteDeceasedRow, getMyProfileDetails, updateProfiles, getDeasedIdData, addFamily, editFamily, deleteFamily, getFamilyIdData,
} from './myprofileApi';
import { myprofileActions } from './myProfileSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/apiStatus/apiSlice';
import {
    DeasedSingleResponse, DeasedListResponse, FamilyResponse, FamilySingleResponse, SuccesResponse,
} from 'models';

function* getDeseasedPersonId(action:any) {
    try {
        yield put(startLoading());
        const response: DeasedSingleResponse = yield call(getDeasedIdData, action.payload);
        if (response.success) {
            yield put(myprofileActions.getDeceasedByIdSuccess(response));
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

function* getDeseasedlistByuserId(action:any) {
    try {
        yield put(startLoading());
        const response: DeasedListResponse = yield call(getDeceasedList, action.payload);
        if (response.success) {
            yield put(myprofileActions.getDeceasedListByUserIdSuccess(response));
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

function* editDeasedPerson(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(editDeasedRow, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Updated successfully!'));
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

function* deleteDeasedDetails(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(deleteDeceasedRow, action.payload);
        if (response.errorCode !== undefined) {
            yield put(setSuccessMessage('Deceased person deleted!'));
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

function* addDeasedMember(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(addDeasedRow, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Deceased person added'));
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

function* getFamilyId(action:any) {
    try {
        yield put(startLoading());
        const response: FamilySingleResponse = yield call(getFamilyIdData, action.payload);
        if (response.success) {
            yield put(myprofileActions.getFamilByIdSuccess(response));
        } else {
            yield put(setError(response.errorMessage));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to addfamily', error);
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

function* getFamilyListByUserId(action:any) {
    try {
        yield put(startLoading());
        const response: FamilyResponse = yield call(getFamilyList, action.payload);
        if (response.success) {
            yield put(myprofileActions.getFamilySuccess(response));
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

function* editFamilyMember(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(editFamily, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Family member updated'));
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

function* deleteFamilyRow(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(deleteFamily, action.payload);
        console.log('delete', response);
        if (response.success) {
            yield put(setSuccessMessage('Family member deleted!'));
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

function* addFamilyMember(action:any) {
    try {
        const response: SuccesResponse = yield call(addFamily, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Family member added'));
        } else {
            yield put(setError(response.errorMessage));
        }
    } catch (error) {
        if (error instanceof Error) {
            yield put(setError(error.message));
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

export function* watchFamilyList() {
    yield takeLatest(myprofileActions.getFamily.type, getFamilyListByUserId);
}
export function* watchAddFamily() {
    yield takeLatest(myprofileActions.addFamily.type, addFamilyMember);
}
export function* watchDeleteFamily() {
    yield takeLatest(myprofileActions.deleteFamily.type, deleteFamilyRow);
}

export function* watchDeceasedPersonRow() {
    yield takeLatest(myprofileActions.getDeceasedById.type, getDeseasedPersonId);
}

export function* watchDeceasedPersonList() {
    yield takeLatest(myprofileActions.getDeceasedListByUserId.type, getDeseasedlistByuserId);
}

export function* watchAddDeased() {
    yield takeLatest(myprofileActions.addDeceased.type, addDeasedMember);
}
export function* watchDeleteDeased() {
    yield takeLatest(myprofileActions.deleteDeceased.type, deleteDeasedDetails);
}

export function* watchEditDeased() {
    yield takeLatest(myprofileActions.updateDeceased.type, editDeasedPerson);
}

function* myProfileSaga() {
    yield all([
        fork(watchDeceasedPersonList),
        fork(watchAddDeased),
        fork(watchDeleteDeased),
        fork(watchEditDeased),
        fork(watchFamilyList),
        fork(watchDeleteFamily),
        fork(watchfamilyDetailsByid),
        fork(watchMyprofileDetails),
        fork(watchUpdateProfile),
        fork(watchAddFamily),
        fork(watchUpdateFamily),
        fork(watchDeceasedPersonRow),
    ]);
}

export default myProfileSaga;
