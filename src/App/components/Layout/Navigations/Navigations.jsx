import React from 'react';

import classes from './Navigations.css';
import Navigation from './Navigation/Navigation';

const navigations = props => (
  <nav>
    <ul className={classes.NavigationItems}>
      <Navigation link="/" active>
        Burger Builder
      </Navigation>
      <Navigation link="/">Checkout</Navigation>
    </ul>
  </nav>
);

export default navigations;
