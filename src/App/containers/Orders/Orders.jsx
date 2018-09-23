import React, { Component } from 'react';
import { connect } from 'react-redux';

import axiosOrderInstance from '../../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as orderAction from '../../store/Order/action.js';

class Orders extends Component {
  componentDidMount() {
    this.props.onOrdersFetchAttempt();
  }

  render() {
    let output = <Spinner />;
    if (!this.props.loading) {
      output = this.props.orders.map(order => (
        <Order key={order.id} order={order} />
      ));
    }
    return <div>{output}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrdersFetchAttempt: () => dispatch(orderAction.fetchOrdersAttempt())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axiosOrderInstance));
