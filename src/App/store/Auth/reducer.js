import * as authAction from './action';

const initialState = {
  token: '',
  userId: '',
  error: null,
  loading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case authAction.AUTH_PENDING: {
      return authActionPending(state, action);
    }
    case authAction.AUTH_FULFILLED: {
      return authActionFulfilled(state, action);
    }
    case authAction.AUTH_REJECTED: {
      return authActionRejected(state, action);
    }
    case authAction.AUTH_LOGOUT: {
      return authActionLogout(state, action);
    }
    default: {
      return state;
    }
  }
};

export default reducer;

const authActionPending = (state, action) => {
  return {
    ...state,
    loading: true,
    error: null
  };
};

const authActionFulfilled = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    token: action.payload.idToken,
    userId: action.payload.localId
  };
};

const authActionRejected = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.payload.message,
    token: '',
    userId: ''
  };
};

const authActionLogout = (state, action) => {
  return {
    ...state,
    loading: false,
    error: null,
    token: '',
    userId: ''
  };
};
