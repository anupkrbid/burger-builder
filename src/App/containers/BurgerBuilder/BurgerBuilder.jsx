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
import * as burgerBuilderActions from '../../store/BurgerBuilder/actions';

class BurgerBuilder extends Component {
  state = {
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

    if (this.state.loading) {
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
        <Burger ingredients={this.props.ingredients} />
        {burgerControls}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch(burgerBuilderActions.addIngredient({ ingredientName: ingName })),
    onIngredientRemoved: ingName =>
      dispatch(
        burgerBuilderActions.removeIngredient({ ingredientName: ingName })
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axiosOrderInstance));
