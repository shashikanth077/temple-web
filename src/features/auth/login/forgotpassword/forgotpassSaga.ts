import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import { forgotPassword, resetPasswordCall } from '../../authApi';
import { forgotpasswodActions } from './forgotpassSlice';
import { User, forgotResPassword, SingleResponse } from 'models';
import {
    setSuccessMessage, setError, startLoading, endLoading,
} from 'storeConfig/api/apiSlice';

function* forgotPasswordCheck(action:any) {
    try {
        yield put(startLoading());
        const response: SingleResponse<forgotResPassword> = yield call(forgotPassword, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Link has been sent to your registered email to reset the password. Please check.'));
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

function* resetPassword(action:any) {
    try {
        yield put(startLoading());
        const response: SingleResponse<User> = yield call(resetPasswordCall, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Password reset successfull'));
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

export function* watchForgotPassword() {
    yield takeLatest(forgotpasswodActions.forgotpasswod.type, forgotPasswordCheck);
}

export function* watchresetPassword() {
    yield takeLatest(forgotpasswodActions.resetPassword.type, resetPassword);
}

function* forgotPasswordSaga() {
    yield all([fork(watchForgotPassword), fork(watchresetPassword)]);
}

export default forgotPasswordSaga;
