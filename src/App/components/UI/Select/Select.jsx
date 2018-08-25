import React from 'react';

import classes from './Select.css';

const select = props => {
  let options = props.options.map(option => (
    <option key={option.key} value={option.value}>
      {option.key}
    </option>
  ));
  return (
    <div className={classes.SelectWrapper}>
      <label className={classes.Label}>{props.label}</label>
      <select className={classes.Select} {...props}>
        {options}
      </select>
    </div>
  );
};

export default select;
