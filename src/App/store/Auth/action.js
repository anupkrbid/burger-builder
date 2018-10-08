import axios from 'axios';

export const AUTH_ATTEMPT = 'AUTH_ATTEMPT';
export const AUTH_PENDING = 'AUTH_PENDING';
export const AUTH_FULFILLED = 'AUTH_FULFILLED';
export const AUTH_REJECTED = 'AUTH_REJECTED';
export const AUTH_LOGOUT_ATTEMPT = 'AUTH_LOGOUT_ATTEMPT';
export const AUTH_LOGOUT_FULFILLED = 'AUTH_LOGOUT_FULFILLED';
export const AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT';

export const authAttempt = payload => {
  return {
    type: AUTH_ATTEMPT,
    payload: payload
  };
};

export const authPending = () => {
  return {
    type: AUTH_PENDING
  };
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
        authCheckTimeOut(
          (expirationData.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      dispatch(authLogoutAttempt());
    }
  };
};

export const authCheckTimeOut = expirationTime => {
  return {
    type: AUTH_CHECK_TIMEOUT,
    payload: { expirationTime: expirationTime }
  };
};
