import axiosOrderInstance from '../../../axios-orders';

export const AUTH_ATTEMPT = 'AUTH_ATTEMPT';
export const AUTH_PENDING = 'AUTH_PENDING';
export const AUTH_FULFILLED = 'AUTH_FULFILLED';
export const AUTH_REJECTED = 'AUTH_REJECTED';

export const authAttempt = payload => {
  return dispatch => {
    dispatch(authPending());
    axiosOrderInstance
      .post('/auth.json', payload)
      .then(res => {
        dispatch(authFulfilled({ id: res.data.name, orderDetail: payload }));
      })
      .catch(err => dispatch(authRejected(err)));
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
