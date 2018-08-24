import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button click={props.cancelCheckout} type="danger">
        CANCEL
      </Button>
      <Button click={props.continueCheckout} type="success">
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutSummary;
