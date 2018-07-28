import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    ingredientName => (
      <li key={ingredientName}>
        <span style={{ textTransform: 'capitalize' }}>{ingredientName}: </span>
        {props.ingredients[ingredientName]}
      </li>
    )
  );
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A Delecious Burger with the following Ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        Total Price: <strong>${props.price.toFixed(2)}</strong>.
      </p>
      <p>Continue to Checkout?</p>
      <Button type="danger" click={props.cancelPurchase}>
        CANCEL
      </Button>
      <Button type="success" click={props.continuePurchase}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
