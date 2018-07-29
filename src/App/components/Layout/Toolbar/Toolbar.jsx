import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import Navigations from '../Navigations/Navigations';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <button className={classes.Menu} onClick={props.openSideDrawer}>
      <i class="fa fa-3x fa-bars" />
    </button>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <div className={classes.DesktopOnly}>
      <Navigations />
    </div>
  </header>
);

export default toolbar;
