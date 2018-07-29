import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import Navigations from '../Navigations/Navigations';

const sideDrawer = props => {
  // ...
  return (
    <div className={classes.SideDrawer}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <Navigations />
    </div>
  );
};

export default sideDrawer;
