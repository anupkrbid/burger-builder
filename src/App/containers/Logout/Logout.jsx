import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as authActions from '../../store/Auth/action.js';

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/auth" />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(authActions.authLogoutAttempt())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
