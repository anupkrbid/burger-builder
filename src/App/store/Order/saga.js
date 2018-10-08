import { all, put, select, takeEvery, takeLatest } from 'redux-saga/effects';

import axiosOrderInstance from '../../../axios-orders';
import * as orderAction from './action';

export function* watchOrderSagas() {
  yield all([
    takeLatest(orderAction.PLACE_ORDER_ATTEMPT, placeOrderAttemptSaga),
    takeEvery(orderAction.FETCH_ORDERS_ATTEMPT, fetchOrdersAttemptSaga)
  ]);
}

function* placeOrderAttemptSaga(action) {
  yield put(orderAction.placeOrderPending());
  const state = yield select();

  try {
    const res = yield axiosOrderInstance.post(
      `/orders.json?auth=${state.auth.token}`,
      action.payload
    );

    yield put(
      orderAction.placeOrderFulfilled({
        id: res.data.name,
        orderDetail: action.payload
      })
    );
  } catch (err) {
    yield put(orderAction.placeOrderRejected(err));
  }
}

function* fetchOrdersAttemptSaga(action) {
  yield put(orderAction.fetchOrdersPending());
  const state = yield select();

  try {
    const res = yield axiosOrderInstance.get(
      `/orders.json?orderBy="userId"&equalTo="${state.auth.userId}"`
    );

    const orders = [];
    for (let key in res.data) {
      orders.push({
        ...res.data[key],
        id: key
      });
    }

    yield put(orderAction.fetchOrdersFulfilled({ orders: orders }));
  } catch (err) {
    yield put(orderAction.fetchOrdersRejected(err));
  }
}
