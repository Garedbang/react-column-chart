import React from 'react';
import { NavLink } from 'react-router-dom';

export default () => (
  <div>
    <h1>
      PAGE OR YEAR THAT YOU TRYING TO GET ARE DOSENT EXIST! GO BACK TO HOME PAGE{' '}
      <NavLink to="/">HOME PAGE</NavLink>
    </h1>
  </div>
);
