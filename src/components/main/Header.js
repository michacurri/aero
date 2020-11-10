import React, { Fragment } from "react";
import Auth from '../authorization/Auth'

function Header() {
  return (
    <Fragment>
      <h2>AERO</h2>
      <Auth />
    </Fragment>
  );
}

export default Header;
