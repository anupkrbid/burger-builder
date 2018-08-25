import React from 'react';

import classes from './Input.css';

const input = props => (
  <div className={classes.InputWrapper}>
    <label className={classes.Label}>{props.label}</label>
    <input className={classes.Input} {...props} />
  </div>
);

export default input;
