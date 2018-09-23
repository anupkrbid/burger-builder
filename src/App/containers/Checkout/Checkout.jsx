import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
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
    let summary = <Redirect to="/" />;

    if (!!this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;

      summary = (
        <div>
          {purchasedRedirect}
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
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};

export default connect(mapStateToProps)(Checkout);
