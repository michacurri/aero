import React, { Fragment, useContext } from "react";
// import AuthContainer from "../../backend/authorization/AuthContainer";
import { UserContext } from "../../backend/authorization/UserContext";
import { Redirect } from "react-router-dom";

function Header({ loginClick, setLoginClick }) {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  function toggleButton() {
    if (loginClick === false) {
      setLoginClick(true);
    } else {
      setLoginClick(false);
    }
  }

  function logout() {
    setCurrentUser(undefined);
    toggleButton();
  }

  let content;
  if (!currentUser) {
    content = (
      <Fragment>
        <h2>AERO</h2>
        {loginClick ? (
          <button onClick={toggleButton}>Close</button>
        ) : (
          <button onClick={toggleButton}>Login / Signup</button>
        )}
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <h2>AERO</h2>
        <button onClick={logout}>Logout</button>
      </Fragment>
    );
  }

  return content;
}

export default Header;
