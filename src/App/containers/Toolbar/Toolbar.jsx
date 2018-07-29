import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../components/Logo/Logo';
import Navigations from '../../components/Layout/Navigations/Navigations';

const toolbar = props => (
  <header className={classes.Toolbar}>
    <button className={classes.MobileOnly} onClick={props.openSideDrawer}>
      <i className="fa fa-3x fa-bars" />
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
