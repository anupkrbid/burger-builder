import { delay } from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

import * as authAction from './action';

export function* watchAuthSagas() {
  yield takeEvery(authAction.AUTH_LOGOUT_ATTEMPT, authLogoutSaga);
  yield takeEvery(authAction.AUTH_CHECK_TIMEOUT, authCheckTimeOutSaga);
}

function* authLogoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationData');
  yield localStorage.removeItem('userId');
  yield put(authAction.authLogoutFulfilled());
}

function* authCheckTimeOutSaga(action) {
  yield delay(action.payload.expirationTime * 1000);
  yield put(authAction.authLogoutAttempt());
}
