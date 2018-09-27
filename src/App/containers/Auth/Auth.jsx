import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as authActions from '../../store/Auth/action.js';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          name: 'email',
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          name: 'password',
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  };

  inputChangedHandler = event => {
    const updatedAuthForm = {
      ...this.state.controls
    };
    updatedAuthForm[event.target.name].value = event.target.value;
    this.setState({ controls: updatedAuthForm });
  };

  formSubmitHandler = event => {
    event.preventDefault();
    this.props.onAuthAttempt(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementArray.map(formElement => (
      <Input
        key={formElement.id}
        name={formElement.config.elementConfig.name}
        type={formElement.config.elementConfig.type}
        placeholder={formElement.config.elementConfig.placeholder}
        value={formElement.config.value}
        onChange={this.inputChangedHandler}
      />
    ));

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.formSubmitHandler.bind(this)}>
          {form}
          <Button type="success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthAttempt: (email, password) =>
      dispatch(authActions.authAttempt(email, password))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
