import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import authReducer from './Auth/reducer';
import burgerBuilderReducer from './BurgerBuilder/reducer';
import orderReducer from './Order/reducer';

import { watchAuthLogoutAttempt } from './Auth/saga';

const rootReducers = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const sageMiddleware = createSagaMiddleware();

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducers /* preloadedState */,
  composeEnhancers(applyMiddleware(thunk, sageMiddleware))
);

sageMiddleware.run(watchAuthLogoutAttempt);

export default store;
