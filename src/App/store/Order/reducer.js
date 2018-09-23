import * as orderAction from './action';

const initialState = {
  orders: [],
  loading: false,
  error: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case orderAction.PLACE_ORDER_INIT: {
      return placeOrderInit(state, action);
    }
    case orderAction.PLACE_ORDER_PENDING: {
      return placeOrderPending(state, action);
    }
    case orderAction.PLACE_ORDER_FULFILLED: {
      return placeOrderFulfilled(state, action);
    }
    case orderAction.PLACE_ORDER_REJECTED: {
      return placeOrderRejected(state, action);
    }
    case orderAction.FETCH_ORDERS_PENDING: {
      return fetchOrdersPending(state, action);
    }
    case orderAction.FETCH_ORDERS_FULFILLED: {
      return fetchOrdersFulfilled(state, action);
    }
    case orderAction.FETCH_ORDERS_REJECTED: {
      return fetchOrdersRejected(state, action);
    }
    default: {
      return state;
    }
  }
};

export default reducer;

const placeOrderInit = (state, action) => {
  return {
    ...state,
    purchased: false
  };
};

const placeOrderPending = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const placeOrderFulfilled = (state, action) => {
  const newOrder = {
    ...action.payload.orderDetail,
    id: action.payload.id
  };
  return {
    ...state,
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  };
};

const placeOrderRejected = (state, action) => {
  return {
    ...state,
    purchased: true,
    loading: false,
    error: true
  };
};

const fetchOrdersPending = (state, action) => {
  return {
    ...state,
    loading: true
  };
};

const fetchOrdersFulfilled = (state, action) => {
  return {
    ...state,
    loading: false,
    orders: action.payload.orders
  };
};

const fetchOrdersRejected = (state, action) => {
  return {
    ...state,
    loading: false,
    error: true
  };
};
