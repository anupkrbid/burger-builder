import { takeEvery, put } from 'redux-saga/effects';

import * as authAction from './action';

export function* watchAuthLogoutAttempt() {
  yield takeEvery(authAction.AUTH_LOGOUT_ATTEMPT, authLogoutSaga);
}

function* authLogoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationData');
  yield localStorage.removeItem('userId');
  yield put(authAction.authLogoutFulfilled());
}
