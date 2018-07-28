import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  const burgerIngredients = Object.keys(props.ingredients).map(ingredientName =>
    [...Array(props.ingredients[ingredientName])].map((_, index) => (
      <BurgerIngredient type={ingredientName} key={ingredientName + index} />
    ))
  );

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {burgerIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
