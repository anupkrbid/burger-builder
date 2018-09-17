import * as burgerBuilderActions from './actions';

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
    case burgerBuilderActions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] + 1
        },
        totalPrice:
          state.totalPrice +
          state.ingredientPrices[action.payload.ingredientName]
      };
    }
    case burgerBuilderActions.REMOVE_INGREDIENT: {
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredientName]:
            state.ingredients[action.payload.ingredientName] - 1
        },
        totalPrice:
          state.totalPrice -
          state.ingredientPrices[action.payload.ingredientName]
      };
    }
    case burgerBuilderActions.FETCH_INGREDIENTS_PRICE_FULFILLED: {
      return {
        ...state,
        error: false,
        loading: false,
        ingredientPrices: action.payload
      };
    }
    case burgerBuilderActions.FETCH_INGREDIENTS_PRICE_REJECTED: {
      return {
        ...state,
        error: true,
        loading: false
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
