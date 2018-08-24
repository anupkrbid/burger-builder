import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import axiosOrderInstance from '../../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactInfo.css';

class ContactInfo extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      zipCode: '',
      country: ''
    }
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const orderDetails = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      deliveryMethod: 'fastest',
      customer: {
        name: 'Anup Kr Bid',
        email: 'anup.blade@gmail.com',
        address: {
          street: 'test street',
          zipCode: '123213',
          country: 'India'
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
      <form>
        <input
          className={classes.Input}
          type="text"
          name="name"
          id=""
          placeholder="name"
        />
        <input
          className={classes.Input}
          type="text"
          name="email"
          id=""
          placeholder="email"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          id=""
          placeholder="street"
        />
        <input
          className={classes.Input}
          type="text"
          name="zip"
          id=""
          placeholder="zip"
        />
        <input
          className={classes.Input}
          type="text"
          name="countery"
          id=""
          placeholder="countery"
        />
        <Button type="success" click={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactInfo}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactInfo;
