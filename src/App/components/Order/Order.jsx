import React from 'react';

import classes from './Order.css';

const order = props => {
  const ingredients = [];
  for (let ingredientName in props.order.ingredients) {
    ingredients.push({
      name: ingredientName,
      amount: props.order.ingredients[ingredientName]
    });
  }

  const ingredientOutput = ingredients.map(ingredient => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: 'capitalize',
          display: 'inline-block',
          margin: '0 8px',
          border: '1px solid #ccc',
          padding: '5px'
        }}
      >
        {ingredient.name} {ingredient.amount}
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price:{' '}
        <strong>USD {Number.parseFloat(props.order.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
