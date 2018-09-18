import axiosOrderInstance from '../../../axios-orders';

export const PLACE_ORDER_ATTEMPT = 'PLACE_ORDER_ATTEMPT';
export const PLACE_ORDER_PENDING = 'PLACE_ORDER_PENDING';
export const PLACE_ORDER_FULFILLED = 'PLACE_ORDER_FULFILLED';
export const PLACE_ORDER_REJECTED = 'PLACE_ORDER_REJECTED';

export const placeOrderAttempt = payload => {
  return dispatch => {
    dispatch(placeOrderPending());
    axiosOrderInstance
      .post('/orders.json', payload)
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
