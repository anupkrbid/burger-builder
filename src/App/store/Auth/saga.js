import axios from 'axios';
import { delay } from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';

import * as authAction from './action';

export function* watchAuthSagas() {
  yield takeEvery(authAction.AUTH_LOGOUT_ATTEMPT, authLogoutSaga);
  yield takeEvery(authAction.AUTH_CHECK_TIMEOUT, authCheckTimeOutSaga);
  yield takeEvery(authAction.AUTH_ATTEMPT, authAttemptSaga);
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

function* authAttemptSaga(action) {
  yield put(authAction.authPending());

  const TOKEN = 'AIzaSyAdUq9GtTwFTJ62de69dISoZRc-AwF-cuo';

  let URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${TOKEN}`;

  if (!action.payload.isSigningIn) {
    URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${TOKEN}`;
  }

  try {
    const res = yield axios.post(URL, {
      ...action.payload,
      returnSecureToken: true
    });

    const expirationData = new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );

    localStorage.setItem('token', res.data.idToken);
    localStorage.setItem('expirationData', expirationData);
    localStorage.setItem('userId', res.data.localId);

    yield put(authAction.authFulfilled(res.data));
    yield put(authAction.authCheckTimeOut(res.data.expiresIn));
  } catch (err) {
    yield put(authAction.authRejected(err.response.data.error));
  }
}
