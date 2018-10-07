import React, { Component } from 'react';

import BurgerBuildControl from './BurgerBuildControl/BurgerBuildControl';
import classes from './BurgerBuildControls.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
];

class BurgerBuildControls extends Component {
  render() {
    let btnSignUpSignInOrOrderNow = null;

    if (this.props.isAuthenticated) {
      btnSignUpSignInOrOrderNow = (
        <button
          className={classes.OrderButton}
          disabled={!this.props.purchasable}
          onClick={this.props.purchase}
        >
          ORDER NOW
        </button>
      );
    } else {
      btnSignUpSignInOrOrderNow = (
        <button
          className={classes.OrderButton}
          disabled={false}
          onClick={this.props.signUpOrSignIn}
        >
          SIGN UP OR SIGN IN TO PLACE ORDERS
        </button>
      );
    }

    return (
      <div className={classes.BuildControls}>
        <h3>Price: ${this.props.price.toFixed(2)}</h3>
        {controls.map(ctrl => (
          <BurgerBuildControl
            key={ctrl.label}
            label={ctrl.label}
            addIngredient={this.props.addIngredient.bind(this, ctrl.type)}
            removeIngredient={this.props.removeIngredient.bind(this, ctrl.type)}
            disableLessButton={this.props.disableLessButton[ctrl.type]}
          />
        ))}
        {btnSignUpSignInOrOrderNow}
      </div>
    );
  }
}

export default BurgerBuildControls;
