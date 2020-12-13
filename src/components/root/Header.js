import React, { Fragment, useContext } from "react";
import { UserContext } from "../../backend/authorization/UserContext";

function Header({ loginClick, setLoginClick }) {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  function toggleLoginClick() {
    if (loginClick === false) {
      setLoginClick(true);
    } else {
      setLoginClick(false);
    }
  }

  function logout() {
    setCurrentUser(undefined);
    toggleLoginClick();
  }

  let content;
  if (!currentUser) {
    content = (
      <Fragment>
        <h2>AERO</h2>
        {loginClick ? (
          <button onClick={toggleLoginClick}>Close</button>
        ) : (
          <button onClick={toggleLoginClick}>Login / Signup</button>
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
