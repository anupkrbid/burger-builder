import React, { Component } from 'react';

import axiosOrderInstance from '../../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axiosOrderInstance
      .get('/orders.json')
      .then(res => {
        const orders = [];
        for (let key in res.data) {
          orders.push({
            ...res.data[key],
            id: key
          });
        }
        this.setState({ loading: false, orders: orders });
      })
      .catch(err => {
        console.log('failed', err);
        this.setState({ loading: false });
      });
  }

  render() {
    let output = <Spinner />;
    if (!this.state.loading) {
      output = this.state.orders.map(order => (
        <Order key={order.id} order={order} />
      ));
    }
    return <div>{output}</div>;
  }
}

export default withErrorHandler(Orders, axiosOrderInstance);
