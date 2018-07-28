import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = props => {
  let burgerIngredients = Object.keys(props.ingredients)
    .map(ingredientName =>
      [...Array(props.ingredients[ingredientName])].map((_, index) => (
        <BurgerIngredient type={ingredientName} key={ingredientName + index} />
      ))
    )
    .reduce((arr, el) => arr.concat(el), []);

  if (!burgerIngredients.length) {
    burgerIngredients = <p>Please Start Adding Ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {burgerIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
