import React from 'react';

import BurgerBuildControls from './BurgerBuildControl/BurgerBuildControl';
import classes from './BurgerBuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

const burgerBuildControls = props => (
  <div className={classes.BuildControls}>
    <h3>Price: ${props.price.toFixed(2)}</h3>
    {controls.map(ctrl => (
      <BurgerBuildControls
        key={ctrl.label}
        label={ctrl.label}
        addIngredient={props.addIngredient.bind(this, ctrl.type)}
        removeIngredient={props.removeIngredient.bind(this, ctrl.type)}
        disableLessButton={props.disableLessButton[ctrl.type]}
      />
    ))}
  </div>
);

export default burgerBuildControls;
