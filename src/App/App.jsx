import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import asyncComponent from './hoc/asyncComponent/asyncComponent.js';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Layout from './hoc/Layout/Layout';
import * as authActions from './store/Auth/action.js';

const asyncAuthComponent = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

const asyncCheckoutComponent = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrdersComponent = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncLogoutComponent = asyncComponent(() => {
  return import('./containers/Logout/Logout');
});

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
              <Route path="/checkout" component={asyncCheckoutComponent} />
            )}

            {this.props.isAuthenticated && (
              <Route path="/orders" component={asyncOrdersComponent} />
            )}

            {!this.props.isAuthenticated && (
              <Route path="/auth" component={asyncAuthComponent} />
            )}

            {this.props.isAuthenticated && (
              <Route path="/logout" component={asyncLogoutComponent} />
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
    tryAutoSignIn: () => dispatch(authActions.authCheckTokenValidity())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
