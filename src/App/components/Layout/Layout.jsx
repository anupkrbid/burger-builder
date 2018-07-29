import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import SideDrawer from './SideDrawer/SideDrawer';
import Toolbar from './Toolbar/Toolbar';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  closeSideDrawerHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  openSideDrawerHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <Aux>
        <Toolbar openSideDrawer={this.openSideDrawerHandler} />
        <SideDrawer
          show={this.state.showSideDrawer}
          hide={this.closeSideDrawerHandler}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
