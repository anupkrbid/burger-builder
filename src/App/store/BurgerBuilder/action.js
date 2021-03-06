export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const REMOVE_INGREDIENT = 'REMOVE_INGREDIENT';
export const FETCH_INGREDIENTS_PRICE_ATTEMPT =
  'FETCH_INGREDIENTS_PRICE_ATTEMPT';
export const FETCH_INGREDIENTS_PRICE_FULFILLED =
  'FETCH_INGREDIENTS_PRICE_FULFILLED';
export const FETCH_INGREDIENTS_PRICE_REJECTED =
  'FETCH_INGREDIENTS_PRICE_REJECTED';

export const addIngredient = payload => {
  return {
    type: ADD_INGREDIENT,
    payload: payload
  };
};

export const removeIngredient = payload => {
  return {
    type: REMOVE_INGREDIENT,
    payload: payload
  };
};

export const fetchIngredientsAttempt = () => {
  return {
    type: FETCH_INGREDIENTS_PRICE_ATTEMPT
  };
};

export const fetchIngredientsPriceFullfilled = payload => {
  return {
    type: FETCH_INGREDIENTS_PRICE_FULFILLED,
    payload: payload
  };
};

export const fetchIngredientsPriceRejected = payload => {
  return {
    type: FETCH_INGREDIENTS_PRICE_REJECTED,
    payload: payload
  };
};
