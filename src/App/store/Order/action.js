import axiosOrderInstance from '../../../axios-orders';

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
  return (dispatch, getState) => {
    dispatch(placeOrderPending());
    axiosOrderInstance
      .post(`/orders.json?auth=${getState().auth.token}`, payload)
      .then(res => {
        dispatch(
          placeOrderFulfilled({ id: res.data.name, orderDetail: payload })
        );
      })
      .catch(err => dispatch(placeOrderRejected(err)));
  };
};

const placeOrderPending = () => {
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
  return (dispatch, getState) => {
    dispatch(fetchOrdersPending());
    axiosOrderInstance
      .get(`/orders.json?auth=${getState().auth.token}`)
      .then(res => {
        const orders = [];
        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id: key
          });
        }
        dispatch(fetchOrdersFulfilled({ orders: orders }));
      })
      .catch(err => dispatch(fetchOrdersRejected(err)));
  };
};

const fetchOrdersPending = () => {
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
