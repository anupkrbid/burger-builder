import React from 'react';

import classes from './Input.css';

const input = props => {
  let isValid = true;
  if (props.required) {
    isValid = props.value.trim().length > 0 && isValid;
  }

  if (props.minLength) {
    isValid = props.value.trim().length >= +props.minLength && isValid;
  }

  if (props.maxLength) {
    isValid = props.value.trim().length <= +props.maxLength && isValid;
  }

  // props.changeformvalidationstate(props.name, isValid);

  const inputClasses = [classes.Input];

  if (!isValid) {
    inputClasses.push(classes.Invalid);
  }
  const properties = { ...props };
  // delete properties.changeformvalidationstate;

  return (
    <div className={classes.InputWrapper}>
      <label className={classes.Label}>{props.label}</label>
      <input className={inputClasses.join(' ')} {...properties} />
    </div>
  );
};

export default input;
