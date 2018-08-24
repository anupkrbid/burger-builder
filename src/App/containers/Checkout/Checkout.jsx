import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo';

class Checkout extends Component {
  state = {
    ingredients: {},
    price: 0
  };

  componentDidMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    const ingrdients = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingrdients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingrdients, price: price });
  };

  continueCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-info');
  };

  cancelCheckoutHandler = () => {
    // this.setState({ purchasing: false });
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          continueCheckout={this.continueCheckoutHandler}
          cancelCheckout={this.cancelCheckoutHandler}
        />
        <Route
          path={this.props.match.path + '/contact-info'}
          render={props => (
            <ContactInfo
              {...props}
              ingredients={this.state.ingredients}
              price={this.state.price}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
