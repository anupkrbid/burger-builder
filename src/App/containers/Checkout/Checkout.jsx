import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Checkout/CheckoutSummary/CheckoutSummary';
import ContactInfo from './ContactInfo/ContactInfo';

class Checkout extends Component {
  continueCheckoutHandler = () => {
    this.props.history.replace('/checkout/contact-info');
  };

  cancelCheckoutHandler = () => {
    this.props.history.goBack();
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ingredients}
          continueCheckout={this.continueCheckoutHandler}
          cancelCheckout={this.cancelCheckoutHandler}
        />
        <Route
          path={this.props.match.path + '/contact-info'}
          component={ContactInfo}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
