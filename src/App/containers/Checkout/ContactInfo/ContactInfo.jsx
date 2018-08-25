import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import axiosOrderInstance from '../../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactInfo.css';
import Input from '../../../components/UI/Input/Input';
import Select from '../../../components/UI/Select/Select';

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
    },
    loading: false
  };

  // shouldComponentUpdate(nextState) {
  //   console.log(nextState);
  //   return true;
  //   // return (
  //   //   nextProps.show !== this.props.show ||
  //   //   nextProps.children !== this.props.children
  //   // );
  // }

  // changeFormValidationStateHandler = (name, validity) => {
  //   if (this.state.orderFormValidation.controls[name] === validity) {
  //     return;
  //   }

  //   const updatedOrderFormValidation = {
  //     ...this.state.orderFormValidation
  //   };
  //   const updatedOrderFormValidationControls = {
  //     ...updatedOrderFormValidation.controls
  //   };
  //   updatedOrderFormValidationControls[name] = validity;

  //   let isFormValid = true;
  //   for (let key in updatedOrderFormValidationControls) {
  //     if (!updatedOrderFormValidationControls[key]) {
  //       isFormValid = false;
  //       break;
  //     }
  //   }
  //   updatedOrderFormValidation.valid = isFormValid;

  //   this.setState({ orderFormValidation: updatedOrderFormValidation });
  // };

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
    axiosOrderInstance
      .post('/orders.json', orderDetails)
      .then(res => {
        this.setState({ loading: false });
        this.props.history.replace('/');
        console.log('success', res);
      })
      .catch(err => {
        console.log('failed', err);
        this.setState({ loading: false });
      });
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
    if (this.state.loading) {
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

export default ContactInfo;
