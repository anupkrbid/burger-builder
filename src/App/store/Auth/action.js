import axios from 'axios';

export const AUTH_ATTEMPT = 'AUTH_ATTEMPT';
export const AUTH_PENDING = 'AUTH_PENDING';
export const AUTH_FULFILLED = 'AUTH_FULFILLED';
export const AUTH_REJECTED = 'AUTH_REJECTED';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authAttempt = payload => {
  return dispatch => {
    dispatch(authPending());

    const data = { ...payload };
    delete data.isSigningIn;
    let URL =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAdUq9GtTwFTJ62de69dISoZRc-AwF-cuo';

    if (!payload.isSigningIn) {
      data.returnSecureToken = true;
      URL =
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAdUq9GtTwFTJ62de69dISoZRc-AwF-cuo';
    }

    axios
      .post(URL, { ...data })
      .then(res => {
        console.log(res);
        dispatch(authFulfilled(res.data));
      })
      .catch(err => dispatch(authRejected(err.response.data.error)));
  };
};

const authPending = () => {
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

export const authLogout = () => {
  return {
    type: AUTH_LOGOUT
  };
};
