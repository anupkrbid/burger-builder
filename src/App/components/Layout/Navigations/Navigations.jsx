import React, { Component } from 'react';

import classes from './Navigations.css';
import Navigation from './Navigation/Navigation';
import Aux from '../../../hoc/Aux';

class Navigations extends Component {
  render() {
    const authOrNot = this.props.isAuthenticated ? (
      <Aux>
        <Navigation link="/orders">Orders</Navigation>
        <Navigation link="/logout">Logout</Navigation>
      </Aux>
    ) : (
      <Navigation link="/auth">Authenticate</Navigation>
    );
    return (
      <nav>
        <ul className={classes.NavigationItems}>
          <Navigation exact link="/">
            Burger Builder
          </Navigation>
          {authOrNot}
        </ul>
      </nav>
    );
  }
}

export default Navigations;
