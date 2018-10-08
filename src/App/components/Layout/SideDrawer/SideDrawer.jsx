import React from 'react';

import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css';
import Navigations from '../Navigations/Navigations';
import Logo from '../../Logo/Logo';

const sideDrawer = props => {
  let sideDrawerClasses = [classes.SideDrawer, classes.Close];

  if (props.show) {
    sideDrawerClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.show} hide={props.hide} />
      <div className={sideDrawerClasses.join(' ')} onClick={props.hide}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <Navigations isAuthenticated={props.isAuthenticated} />
      </div>
    </Aux>
  );
};

export default sideDrawer;
