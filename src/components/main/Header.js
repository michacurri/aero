import React, { Fragment } from "react";
// import firebase from '../../backend/firebase'
import AuthContainer from '../authorization/AuthContainer'

function Header() {
  return (
    <Fragment>
      <h2>AERO</h2>
      <AuthContainer />
    </Fragment>
  );
}

export default Header;
