import React from 'react';

import classes from './Navigation.css';

const navigation = props => (
  <li className={classes.NavigationItem}>
    <a href={props.link} className={props.active ? classes.active : null}>
      {props.children}
    </a>
  </li>
);

export default navigation;
