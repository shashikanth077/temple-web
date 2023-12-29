import { call, put, takeLatest } from 'redux-saga/effects';
import { Menu, ListResponse } from '../../models';
import { menuApi } from './menuApi';
import { menuActions } from './menuSlice';

function* fetchmenuList() {
    try {
        const response: ListResponse<Menu> = yield call(menuApi.getAll);
        yield put(menuActions.fetchMenuListSuccess(response));
    } catch (error) {
        if (error instanceof Error) {
            console.log('Failed to fetch menu list', error);
            yield put(menuActions.fetchMenuListFailed(error.message));
        }
    }
}

export default function* menuSaga() {
    yield takeLatest(menuActions.fetchMenuList.type, fetchmenuList);
}
