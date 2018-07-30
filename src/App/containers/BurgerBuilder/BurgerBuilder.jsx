import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import axiosOrderInstance from '../../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BurgerBuildControls from '../../components/Burger/BurgerBuildControls/BurgerBuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const undatedIngredients = {
      ...this.state.ingredients
    };
    undatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice + priceAddition;

    this.setState({
      totalPrice: updatedPrice,
      ingredients: undatedIngredients,
      purchasable: true
    });
  };

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const undatedIngredients = {
      ...this.state.ingredients
    };
    undatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const updatedPrice = oldPrice - priceDeduction;

    this.setState({
      totalPrice: updatedPrice,
      ingredients: undatedIngredients
    });
    this.updatePurchaseState(undatedIngredients);
  };

  updatePurchaseState(ingredients) {
    let sum = Object.keys(ingredients)
      .map(ingredientName => ingredients[ingredientName])
      .reduce((sum, el) => sum + el, 0);

    this.setState({ purchasable: sum > 0 });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  continuePurchaseHandler = () => {
    this.setState({ loading: true });
    const orderDetails = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
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
        this.setState({ purchasing: false, loading: false });
        console.log('success', res);
      })
      .catch(err => {
        console.log('failed', err);
        this.setState({ purchasing: false, loading: false });
      });
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  render() {
    const disableLessButtonInfo = {
      ...this.state.ingredients
    };

    for (let key in disableLessButtonInfo) {
      disableLessButtonInfo[key] = disableLessButtonInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
        cancelPurchase={this.cancelPurchaseHandler}
        continuePurchase={this.continuePurchaseHandler}
      />
    );

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} hide={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BurgerBuildControls
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disableLessButton={disableLessButtonInfo}
          price={this.state.totalPrice}
          purchasable={this.state.purchasable}
          purchase={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosOrderInstance);
