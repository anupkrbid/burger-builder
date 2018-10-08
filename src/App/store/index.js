import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './Auth/reducer';
import burgerBuilderReducer from './BurgerBuilder/reducer';
import orderReducer from './Order/reducer';

const rootReducers = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
});

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducers /* preloadedState */,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
