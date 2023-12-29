import {
    call, put, fork, all, takeLatest,
} from 'redux-saga/effects';
import { SingleResponse } from '../../models/common';
import { Contact } from '../../models';
import { getContacts, sendContact } from './contactApi';
import { contactActions, sendcontactActions } from './contactSlice';
import { SuccessRes } from 'models';

function* fetchcontactList() {
    try {
        const response: SingleResponse<Contact> = yield call(getContacts, {});
        yield put(contactActions.fetchContactListSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch contact list', error);
            yield put(contactActions.fetchContactListFailed(error.message));
        }
    }
}
function* sendContactInfo(action:any) {
    try {
        const response: SingleResponse<SuccessRes> = yield call(sendContact, action.payload);
        yield put(sendcontactActions.sendContactInfoSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to submit contact info', error);
            yield put(sendcontactActions.sendContactInfoFailed(error.message));
        }
    }
}

export function* watchContactInfo() {
    yield takeLatest(contactActions.fetchContactList.type, fetchcontactList);
}
export function* watchsendContactInfo() {
    yield takeLatest(sendcontactActions.sendContactInfo, sendContactInfo);
}

function* ContactSaga() {
    yield all([fork(watchContactInfo), fork(watchsendContactInfo)]);
}

export default ContactSaga;
