import React, { Fragment, useContext } from "react";
import AuthContainer from "../authorization/AuthContainer";
import { UserContext } from "../authorization/UserContext";

function Header({ loginClick, setLoginClick }) {
  const [currentUser] = useContext(UserContext);

  function toggleButton() {
    if (loginClick === false) {
      setLoginClick(true);
    } else {
      setLoginClick(false);
    }
  }

  let content;
  if (!currentUser) {
    content = (
      <Fragment>
        <h2>AERO</h2>
        {loginClick ? (
          <button onClick={toggleButton}>X</button>
        ) : (
          <button onClick={toggleButton}>Login / Signup</button>
        )}
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <h2>AERO</h2>
        <AuthContainer />
      </Fragment>
    );
  }

  return content;
}

export default Header;
