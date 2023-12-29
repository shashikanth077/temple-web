import { call, put, takeLatest } from 'redux-saga/effects';
import { Service, ListResponse } from '../../models';
import { servicesApi } from './serviceApi';
import { serviceActions } from './serviceSlice';

function* fetchserviceList() {
    try {
        const response: ListResponse<Service> = yield call(servicesApi.getAll);
        yield put(serviceActions.fetchServiceListSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch service list', error);
            yield put(serviceActions.fetchServiceListFailed(error.message));
        }
    }
}

export default function* serviceSaga() {
    yield takeLatest(serviceActions.fetchServiceList.type, fetchserviceList);
}
