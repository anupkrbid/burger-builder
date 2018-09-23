import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux';
import axiosOrderInstance from '../../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BurgerBuildControls from '../../components/Burger/BurgerBuildControls/BurgerBuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderAction from '../../store/BurgerBuilder/action';
import * as orderAction from '../../store/Order/action';

class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onFetchIngredientsAttempt();
  }

  updatePurchaseState(ingredients) {
    let sum = Object.keys(ingredients)
      .map(ingredientName => ingredients[ingredientName])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  continuePurchaseHandler = () => {
    this.props.onInitPlaceOrder();
    this.props.history.push('/checkout');
  };

  cancelPurchaseHandler = () => {
    this.setState({ purchasing: false });
  };

  render() {
    const disableLessButtonInfo = {
      ...this.props.ingredients
    };

    for (let key in disableLessButtonInfo) {
      disableLessButtonInfo[key] = disableLessButtonInfo[key] <= 0;
    }

    let orderSummary = (
      <OrderSummary
        price={this.props.totalPrice}
        ingredients={this.props.ingredients}
        cancelPurchase={this.cancelPurchaseHandler}
        continuePurchase={this.continuePurchaseHandler}
      />
    );

    if (this.props.loading) {
      orderSummary = <Spinner />;
    }

    let burgerControls = (
      <BurgerBuildControls
        addIngredient={this.props.onIngredientAdded}
        removeIngredient={this.props.onIngredientRemoved}
        disableLessButton={disableLessButtonInfo}
        price={this.props.totalPrice}
        purchasable={this.updatePurchaseState(this.props.ingredients)}
        purchase={this.purchaseHandler}
      />
    );

    if (!Object.keys(this.props.ingredientPrices).length) {
      burgerControls = this.props.error ? (
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
        <Burger ingredients={this.props.ingredients} />
        {burgerControls}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    ingredientPrices: state.burgerBuilder.ingredientPrices,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    loading: state.burgerBuilder.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(burgerBuilderAction.addIngredient({ ingredientName: ingName })),
    onIngredientRemoved: ingName =>
      dispatch(
        burgerBuilderAction.removeIngredient({ ingredientName: ingName })
      ),
    onFetchIngredientsAttempt: () =>
      dispatch(burgerBuilderAction.fetchIngredientsAttempt()),
    onInitPlaceOrder: () => dispatch(orderAction.placeOrderInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosOrderInstance));
