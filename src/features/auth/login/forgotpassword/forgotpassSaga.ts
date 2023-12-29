import {
    call, put, all, fork, takeLatest,
} from 'redux-saga/effects';
import { forgotPassword, resetPasswordCall } from '../../authApi';
import { forgotpasswodActions } from './forgotpassSlice';
import { User, forgotResPassword, SingleResponse } from 'models';

function* forgotPasswordCheck(action:any) {
    try {
        const response: SingleResponse<forgotResPassword> = yield call(forgotPassword, action.payload);
        if (response.errorCode === undefined) {
            yield put(forgotpasswodActions.forgotpasswodSuccess(response));
        } else {
            console.log('Failed to fetch user forgotpassword details list', response.errorMessage);
            yield put(forgotpasswodActions.forgotpasswodFailed(response.errorMessage));
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch user forgotpassword details list', error);
            yield put(forgotpasswodActions.forgotpasswodFailed(error.message));
        }
    }
}

function* resetPassword(action:any) {
    try {
        const response: SingleResponse<User> = yield call(resetPasswordCall, action.payload);
        yield put(forgotpasswodActions.resetPasswordSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch user forgotpassword details list', error);
            yield put(forgotpasswodActions.resetPasswordFailure(error.message));
        }
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
