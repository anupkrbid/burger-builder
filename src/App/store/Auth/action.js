export const AUTH_ATTEMPT = 'AUTH_ATTEMPT';
export const AUTH_PENDING = 'AUTH_PENDING';
export const AUTH_FULFILLED = 'AUTH_FULFILLED';
export const AUTH_REJECTED = 'AUTH_REJECTED';
export const AUTH_LOGOUT_ATTEMPT = 'AUTH_LOGOUT_ATTEMPT';
export const AUTH_LOGOUT_FULFILLED = 'AUTH_LOGOUT_FULFILLED';
export const AUTH_CHECK_TOKEN_VALIDITY = 'AUTH_CHECK_TOKEN_VALIDITY';
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

export const authCheckTokenValidity = () => {
  return {
    type: AUTH_CHECK_TOKEN_VALIDITY
  };
};

export const authCheckTimeOut = expirationTime => {
  return {
    type: AUTH_CHECK_TIMEOUT,
    payload: { expirationTime: expirationTime }
  };
};
