import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import {
    updateRoles, getUserById, getUsers, addUser, deleteUser,
} from './userApi';
import { adminUserActions } from './userSlice';
import {
    startLoading, endLoading, setError, setSuccessMessage,
} from 'storeConfig/api/apiSlice';
import { SuccesResponse, userSingleResponse, userResponse } from 'models';

function* getAllUsers(action:any) {
    try {
        yield put(startLoading());
        const response: userResponse = yield call(getUsers, {});
        if (response.success) {
            yield put(adminUserActions.getUsersSuccess(response));
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

function* getUserByIdRow(action:any) {
    try {
        yield put(startLoading());
        const response: userSingleResponse = yield call(getUserById, action.payload);

        if (response.success) {
            yield put(setSuccessMessage('Success'));
            yield put(adminUserActions.getUserByIdSuccess(response));
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

function* addUsers(action:any) {
    try {
        yield put(startLoading());
        const response: userResponse = yield call(addUser, action.payload);
        if (response.success) {
            yield put(setSuccessMessage(response.message));
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

function* updateUsers(action:any) {
    console.log('User edit paylod', action.payload);
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(updateRoles, action.payload);
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

function* deleteUsers(action:any) {
    try {
        yield put(startLoading());
        const response: SuccesResponse = yield call(deleteUser, action.payload);
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

export function* watchgetusers() {
    yield takeLatest(adminUserActions.getUsers.type, getAllUsers);
}
export function* watchAddUser() {
    yield takeLatest(adminUserActions.addUser.type, addUsers);
}
export function* watchupdateUser() {
    yield takeLatest(adminUserActions.updateUser.type, updateUsers);
}
export function* WatchgetUserById() {
    yield takeLatest(adminUserActions.getUserById.type, getUserByIdRow);
}
export function* watchdeleteUser() {
    yield takeLatest(adminUserActions.deleteUser.type, deleteUsers);
}

function* adminUserSaga() {
    yield all([fork(watchgetusers), fork(WatchgetUserById), fork(watchAddUser), fork(watchupdateUser), fork(watchdeleteUser)]);
}

export default adminUserSaga;
