import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Logout/Logout';
import * as authActions from './store/Auth/action.js';

class App extends Component {
  componentDidMount() {
    this.props.tryAutoSignIn();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            {this.props.isAuthenticated && (
              <Route path="/checkout" component={Checkout} />
            )}

            {this.props.isAuthenticated && (
              <Route path="/orders" component={Orders} />
            )}

            {!this.props.isAuthenticated && (
              <Route path="/auth" component={Auth} />
            )}

            {this.props.isAuthenticated && (
              <Route path="/logout" component={Logout} />
            )}

            <Route path="/" exact component={BurgerBuilder} />

            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: !!state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignIn: () => dispatch(authActions.authCheckValidity())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
