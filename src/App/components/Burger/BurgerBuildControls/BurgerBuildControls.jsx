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
    {controls.map(ctrl => (
      <BurgerBuildControls key={ctrl.label} label={ctrl.label} />
    ))}
  </div>
);

export default burgerBuildControls;
