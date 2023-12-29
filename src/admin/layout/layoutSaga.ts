import {
    call, all, takeEvery, fork,
} from 'redux-saga/effects';
import { adminlayoutActions } from './layoutSlice';

/**
 * Toggle the class on body
 * @param {*} cssClass
 */
function manageBodyClass(cssClass: string, action = 'toggle') {
    switch (action) {
    case 'add':
        if (document.body) document.body.classList.add(cssClass);
        break;
    case 'remove':
        if (document.body) document.body.classList.remove(cssClass);
        break;
    default:
        if (document.body) document.body.classList.toggle(cssClass);
        break;
    }

    return true;
}

/**
 * Show the rightsidebar
 */
function* showRightSidebar() {
    try {
        yield call(manageBodyClass, 'right-bar-enabled', 'add');
    } catch (error) {
        console.log(error);
    }
}

/**
 * Hides the rightsidebar
 */
function* hideRightSidebar() {
    try {
        yield call(manageBodyClass, 'right-bar-enabled', 'remove');
    } catch (error) {
        console.log(error);
    }
}

export function* watchShowRightSidebar(): any {
    yield takeEvery(adminlayoutActions.setShowRightBar, showRightSidebar);
}

export function* watchHideRightSidebar(): any {
    yield takeEvery(adminlayoutActions.setHideRightBar, hideRightSidebar);
}

function* LayoutSaga(): any {
    yield all([fork(watchShowRightSidebar), fork(watchHideRightSidebar)]);
}

export default LayoutSaga;
