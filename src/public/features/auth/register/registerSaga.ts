import {
    call, put, takeLatest, fork, all,
} from 'redux-saga/effects';
import {
    signup, AccountActivation, sendOTP, verifyOTP,
} from '../authApi';
import { registerActions } from './registerSlice';
import { APICore, setAuthorization } from 'helpers/api';
import { OTPResponse, UserSuccesResponse } from 'models';
import {
    setSuccessMessage, setError, startLoading, endLoading,
} from 'storeConfig/apiStatus/apiSlice';

function* UserRegistration(action:any) {
    try {
        yield put(startLoading());
        const response: UserSuccesResponse = yield call(signup, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('success'));
            yield put(registerActions.registerSuccess(action.payload));
        } else {
            APICore.setLoggedInUser(null);
            setAuthorization(null);
            yield put(setError(response.errorMessage));
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

function* UserActivation(action:any) {
    try {
        yield put(startLoading());
        const response: UserSuccesResponse = yield call(AccountActivation, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Email has been verified and account has activated'));
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

function* UserSendOTP(action:any) {
    try {
        yield put(startLoading());
        const response: OTPResponse = yield call(sendOTP, action.payload);
        if (response.success) {
            yield put(registerActions.sendOtpSuccess(response));
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

function* VerifyUserOTP(action:any) {
    try {
        yield put(startLoading());
        const response: UserSuccesResponse = yield call(verifyOTP, action.payload);
        if (response.success) {
            yield put(setSuccessMessage('Phone number verified successfully'));
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

export function* watchregister() {
    yield takeLatest(registerActions.register.type, UserRegistration);
}
export function* watchActivation() {
    yield takeLatest(registerActions.activation.type, UserActivation);
}

export function* watchUserSendOTP() {
    yield takeLatest(registerActions.sendOtp.type, UserSendOTP);
}

export function* watchVerifyUserOTP() {
    yield takeLatest(registerActions.verifyOTP.type, VerifyUserOTP);
}

function* registerSaga() {
    yield all([fork(watchregister), fork(watchActivation), fork(watchUserSendOTP), fork(watchVerifyUserOTP)]);
}

export default registerSaga;
