import React from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import SideDrawer from './SideDrawer/SideDrawer';
import Toolbar from './Toolbar/Toolbar';

const layout = props => {
  return (
    <Aux>
      <Toolbar />
      <SideDrawer />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

export default layout;
