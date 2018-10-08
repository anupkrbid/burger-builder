export const PLACE_ORDER_INIT = 'PLACE_ORDER_INIT';
export const PLACE_ORDER_ATTEMPT = 'PLACE_ORDER_ATTEMPT';
export const PLACE_ORDER_PENDING = 'PLACE_ORDER_PENDING';
export const PLACE_ORDER_FULFILLED = 'PLACE_ORDER_FULFILLED';
export const PLACE_ORDER_REJECTED = 'PLACE_ORDER_REJECTED';

export const FETCH_ORDERS_ATTEMPT = 'FETCH_ORDERS_ATTEMPT';
export const FETCH_ORDERS_PENDING = 'FETCH_ORDERS_PENDING';
export const FETCH_ORDERS_FULFILLED = 'FETCH_ORDERS_FULFILLED';
export const FETCH_ORDERS_REJECTED = 'FETCH_ORDERS_REJECTED';

export const placeOrderInit = () => {
  return {
    type: PLACE_ORDER_INIT
  };
};

export const placeOrderAttempt = payload => {
  return {
    type: PLACE_ORDER_ATTEMPT,
    payload: payload
  };
};

export const placeOrderPending = () => {
  return {
    type: PLACE_ORDER_PENDING
  };
};

export const placeOrderFulfilled = payload => {
  return {
    type: PLACE_ORDER_FULFILLED,
    payload: payload
  };
};

export const placeOrderRejected = payload => {
  return {
    type: PLACE_ORDER_REJECTED,
    payload: payload
  };
};

export const fetchOrdersAttempt = () => {
  return {
    type: FETCH_ORDERS_ATTEMPT
  };
};

export const fetchOrdersPending = () => {
  return {
    type: FETCH_ORDERS_PENDING
  };
};

export const fetchOrdersFulfilled = payload => {
  return {
    type: FETCH_ORDERS_FULFILLED,
    payload: payload
  };
};

export const fetchOrdersRejected = payload => {
  return {
    type: FETCH_ORDERS_REJECTED,
    payload: payload
  };
};
