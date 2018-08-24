import React from 'react';

import classes from './Navigations.css';
import Navigation from './Navigation/Navigation';

const navigations = props => (
  <nav>
    <ul className={classes.NavigationItems}>
      <Navigation exact link="/">
        Burger Builder
      </Navigation>
      <Navigation link="/orders">Orders</Navigation>
    </ul>
  </nav>
);

export default navigations;
