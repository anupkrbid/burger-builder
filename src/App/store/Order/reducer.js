import * as orderAction from './action';

const initialState = {
  orders: [],
  loading: false,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case orderAction.PLACE_ORDER_PENDING: {
      return {
        ...state,
        loading: true
      };
    }
    case orderAction.PLACE_ORDER_FULFILLED: {
      const newOrder = {
        ...action.payload.orderDetail,
        id: action.payload.id
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder)
      };
    }
    case orderAction.PLACE_ORDER_REJECTED: {
      return {
        ...state,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
};
export default reducer;
