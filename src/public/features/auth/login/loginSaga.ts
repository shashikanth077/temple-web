import {
    call, put, all, fork, delay, takeLatest,
} from 'redux-saga/effects';
import { login, logout, checkProfileStatus } from '../authApi';
import { authActions } from './loginSlice';
import { APICore, setAuthorization } from 'helpers/api';
import { UserResponse } from 'models';
import {
    setSuccessMessage, setError, startLoading, endLoading,
} from 'storeConfig/apiStatus/apiSlice';

interface ProfileStatus{
    profileStatus:any;
    success:any;
}
function* fetchLoginCheck(action:any) {
    try {
        yield put(startLoading());
        const response: UserResponse = yield call(login, action.payload);
        if (response.success) {
            APICore.setLoggedInUser(response);
            const ProfileStatusData = {
                userid: response.id,
            };
            const profileStatus:ProfileStatus = yield call(checkProfileStatus, ProfileStatusData);
            if (profileStatus.success === false) {
                yield put(authActions.updateProfileStatus(profileStatus.success));
            }
            yield put(setSuccessMessage('Login success'));
            yield put(authActions.loginSuccess(response));
        } else {
            APICore.setLoggedInUser(null);
            yield put(setError(response.errorMessage));
            setAuthorization(null);
        }
    } catch (error) {
        if (error instanceof Error) {
            APICore.setLoggedInUser(null);
            setAuthorization(null);
            yield put(setError(error.message));
        }
    } finally {
        yield put(endLoading());
    }
}

function* handleLogout() {
    yield delay(500);
    const response: UserResponse = yield call(logout);
    APICore.destoryUser();
    yield put(authActions.logoutSuccess(response.message));
}

export function* watchLogin() {
    yield takeLatest(authActions.login.type, fetchLoginCheck);
}
export function* watchLogout() {
    yield takeLatest(authActions.logout.type, handleLogout);
}

function* authSaga() {
    yield all([fork(watchLogin), fork(watchLogout)]);
}

export default authSaga;
