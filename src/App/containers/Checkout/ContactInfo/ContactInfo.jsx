import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import axiosOrderInstance from '../../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactInfo.css';
import Input from '../../../components/UI/Input/Input';
import Select from '../../../components/UI/Select/Select';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderAction from '../../../store/Order/action.js';

class ContactInfo extends Component {
  state = {
    orderForm: {
      name: '',
      email: '',
      street: '',
      zipCode: '',
      country: '',
      deliveryMethod: 'fastest'
    },
    orderFormValidation: {
      valid: false,
      controls: {
        name: false,
        email: false,
        street: false,
        zipCode: false,
        country: false
      }
    }
  };

  inputChangedHandler = event => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    updatedOrderForm[event.target.name] = event.target.value;
    this.setState({ orderForm: updatedOrderForm });
  };

  submitOrderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const orderDetails = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      deliveryMethod: this.state.orderForm.deliveryMethod,
      customer: {
        name: this.state.orderForm.name,
        email: this.state.orderForm.email,
        address: {
          street: this.state.orderForm.street,
          zipCode: this.state.orderForm.zipCode,
          country: this.state.orderForm.country
        }
      }
    };
    this.props.onPlaceOrderAttempt(orderDetails);
  };

  render() {
    let form = (
      <form onSubmit={this.submitOrderHandler}>
        <Input
          type="text"
          name="name"
          label="Name"
          required="true"
          value={this.state.orderForm.name}
          placeholder="name"
          // changeformvalidationstate={this.changeFormValidationStateHandler}
          onChange={this.inputChangedHandler}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          required="true"
          value={this.state.orderForm.email}
          placeholder="email"
          // changeformvalidationstate={this.changeFormValidationStateHandler}
          onChange={this.inputChangedHandler}
        />
        <Input
          type="text"
          name="street"
          label="Street"
          required="true"
          value={this.state.orderForm.street}
          placeholder="street"
          // changeformvalidationstate={this.changeFormValidationStateHandler}
          onChange={this.inputChangedHandler}
        />
        <Input
          type="text"
          name="zipCode"
          label="ZIP Code"
          required="true"
          minLength="5"
          maxLength="5"
          value={this.state.orderForm.zipCode}
          placeholder="ZIP Code"
          // changeformvalidationstate={this.changeFormValidationStateHandler}
          onChange={this.inputChangedHandler}
        />
        <Input
          type="text"
          name="country"
          label="Country"
          required="true"
          value={this.state.orderForm.country}
          placeholder="country"
          // changeformvalidationstate={this.changeFormValidationStateHandler}
          onChange={this.inputChangedHandler}
        />
        <Select
          name="deliveryMethod"
          label="Delivery Method"
          value={this.state.orderForm.deliveryMethod}
          onChange={this.inputChangedHandler}
          options={[
            { key: 'fastest', value: 'fastest' },
            { key: 'cheapest', value: 'cheapest' }
          ]}
        />
        <Button type="success">ORDER</Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactInfo}>
        <h4>Enter Your Contact Info</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPlaceOrderAttempt: orderDetails =>
      dispatch(orderAction.placeOrderAttempt(orderDetails))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactInfo, axiosOrderInstance));
