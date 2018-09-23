import * as burgerBuilderAction from './action';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  ingredientPrices: {},
  totalPrice: 4,
  loading: true,
  error: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case burgerBuilderAction.ADD_INGREDIENT: {
      return addIndredient(state, action);
    }
    case burgerBuilderAction.REMOVE_INGREDIENT: {
      return removeIndredient(state, action);
    }
    case burgerBuilderAction.FETCH_INGREDIENTS_PRICE_FULFILLED: {
      return fetchIndredientsPriceFulfilled(state, action);
    }
    case burgerBuilderAction.FETCH_INGREDIENTS_PRICE_REJECTED: {
      return fetchIndredientsPriceRejected(state, action);
    }
    default: {
      return state;
    }
  }
};

export default reducer;

const addIndredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.payload.ingredientName]:
        state.ingredients[action.payload.ingredientName] + 1
    },
    totalPrice:
      state.totalPrice + state.ingredientPrices[action.payload.ingredientName]
  };
};

const removeIndredient = (state, action) => {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.payload.ingredientName]:
        state.ingredients[action.payload.ingredientName] - 1
    },
    totalPrice:
      state.totalPrice - state.ingredientPrices[action.payload.ingredientName]
  };
};

const fetchIndredientsPriceFulfilled = (state, action) => {
  return {
    ...state,
    error: false,
    loading: false,
    totalPrice: 4,
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    ingredientPrices: action.payload
  };
};

const fetchIndredientsPriceRejected = (state, action) => {
  return {
    ...state,
    error: true,
    loading: false
  };
};
