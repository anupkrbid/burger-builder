import axios from 'axios';
import { setTimeout } from 'timers';

export const AUTH_ATTEMPT = 'AUTH_ATTEMPT';
export const AUTH_PENDING = 'AUTH_PENDING';
export const AUTH_FULFILLED = 'AUTH_FULFILLED';
export const AUTH_REJECTED = 'AUTH_REJECTED';
export const AUTH_LOGOUT_ATTEMPT = 'AUTH_LOGOUT_ATTEMPT';
export const AUTH_LOGOUT_FULFILLED = 'AUTH_LOGOUT_FULFILLED';

export const authAttempt = payload => {
  return dispatch => {
    dispatch(authPending());

    const TOKEN = 'AIzaSyAdUq9GtTwFTJ62de69dISoZRc-AwF-cuo';

    let URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${TOKEN}`;

    if (!payload.isSigningIn) {
      URL = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${TOKEN}`;
    }

    axios
      .post(URL, { ...payload, returnSecureToken: true })
      .then(res => {
        const expirationData = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationData', expirationData);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authFulfilled(res.data));
        dispatch(checkAuthTimeOut(res.data.expiresIn));
      })
      .catch(err => dispatch(authRejected(err.response.data.error)));
  };
};

const authPending = () => {
  return {
    type: AUTH_PENDING
  };
};

const checkAuthTimeOut = expirationTime => {
  return dispatch =>
    setTimeout(() => dispatch(authLogoutAttempt()), expirationTime * 1000);
};

export const authFulfilled = payload => {
  return {
    type: AUTH_FULFILLED,
    payload: payload
  };
};

export const authRejected = payload => {
  return {
    type: AUTH_REJECTED,
    payload: payload
  };
};

export const authLogoutAttempt = () => {
  return {
    type: AUTH_LOGOUT_ATTEMPT
  };
};

export const authLogoutFulfilled = () => {
  return {
    type: AUTH_LOGOUT_FULFILLED
  };
};

export const authCheckValidity = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationData = new Date(localStorage.getItem('expirationData'));
    if (!!token && expirationData > new Date()) {
      dispatch(
        authFulfilled({
          idToken: token,
          localId: userId
        })
      );
      dispatch(
        checkAuthTimeOut(
          (expirationData.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      dispatch(authLogoutAttempt());
    }
  };
};
