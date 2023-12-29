import {
    call, put, takeLatest,
} from 'redux-saga/effects';
import { signup } from '../authApi';
import { registerActions } from './registerSlice';
import { APICore, setAuthorization } from 'helpers/api';
import { UserSuccesResponse } from 'models';
import {
    setSuccessMessage, setError, startLoading, endLoading,
} from 'storeConfig/api/apiSlice';

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

export default function* registerSaga() {
    yield takeLatest(registerActions.register.type, UserRegistration);
}
