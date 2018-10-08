import { put, takeEvery } from 'redux-saga/effects';

import * as burgerBuilderAction from './action';
import axiosOrderInstance from '../../../axios-orders';

export function* watchBurgerBuilderSagas() {
  yield takeEvery(
    burgerBuilderAction.FETCH_INGREDIENTS_PRICE_ATTEMPT,
    fetchIngredientsAttemptSaga
  );
}

function* fetchIngredientsAttemptSaga() {
  try {
    const res = yield axiosOrderInstance.get('/ingredients.json');
    yield put(burgerBuilderAction.fetchIngredientsPriceFullfilled(res.data));
  } catch (err) {
    yield put(burgerBuilderAction.fetchIngredientsPriceRejected(err));
  }
}
