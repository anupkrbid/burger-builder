import React, { Component } from 'react';

import Aux from '../../hoc/Aux';
import axiosOrderInstance from '../../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BurgerBuildControls from '../../components/Burger/BurgerBuildControls/BurgerBuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
    loading: false,
    priceLoaded: false,
    errorLoadingPrice: false
  };

  componentDidMount() {
    if (!this.state.priceLoaded) {
      axiosOrderInstance
        .get('/ingredients.json')
        .then(res =>
          this.setState({ priceLoaded: true, ingredientPrices: res.data })
        )
        .catch(err => this.setState({ errorLoadingPrice: true }));
    }
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const undatedIngredients = {
      ...this.state.ingredients
    };
    undatedIngredients[type] = updatedCount;
    const priceAddition = this.state.ingredientPrices[type];
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
    const priceDeduction = this.state.ingredientPrices[type];
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
    const queryParams = [];
    for (let ingredient in this.state.ingredients) {
      queryParams.push(
        `${encodeURIComponent(ingredient)}=${encodeURIComponent(
          this.state.ingredients[ingredient]
        )}`
      );
    }
    queryParams.push('price=' + this.state.totalPrice);
    const queryString = queryParams.join('&');
    this.props.history.push({
      pathname: '/checkout',
      search: `?${queryString}`
    });
    // this.setState({ loading: true });
    // const orderDetails = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   deliveryMethod: 'fastest',
    //   customer: {
    //     name: 'Anup Kr Bid',
    //     email: 'anup.blade@gmail.com',
    //     address: {
    //       street: 'test street',
    //       zipCode: '123213',
    //       country: 'India'
    //     }
    //   }
    // };
    // axiosOrderInstance
    //   .post('/orders.json', orderDetails)
    //   .then(res => {
    //     this.setState({ purchasing: false, loading: false });
    //     console.log('success', res);
    //   })
    //   .catch(err => {
    //     console.log('failed', err);
    //     this.setState({ purchasing: false, loading: false });
    //   });
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

    let burgerControls = (
      <BurgerBuildControls
        addIngredient={this.addIngredientHandler}
        removeIngredient={this.removeIngredientHandler}
        disableLessButton={disableLessButtonInfo}
        price={this.state.totalPrice}
        purchasable={this.state.purchasable}
        purchase={this.purchaseHandler}
      />
    );

    if (!this.state.priceLoaded) {
      burgerControls = this.state.errorLoadingPrice ? (
        <p>Ingredients not loaded. Please try after sometime.</p>
      ) : (
        <Spinner />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} hide={this.cancelPurchaseHandler}>
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        {burgerControls}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axiosOrderInstance);
