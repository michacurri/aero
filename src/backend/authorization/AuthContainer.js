import React, { Fragment, useContext, useCallback, useState } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import ProfileCreate from "../../components/root/ProfileCreate";
import Field from "../../components/root/Field";
// import { UserContext } from "./UserContext";
// import { ImpersonatorContext } from "./ImpersonatorContext";
// import AuthLoginSignup from "./AuthLoginSignup";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const AuthContainer = ({loadUserProfile}) => {
  // const [currentUser, setCurrentUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [link, setLink] = useState("signup");
  // const [impersonator, setImpersonator] = useContext(ImpersonatorContext);

  //* const loadImpersonator = useCallback(() => {
  //   setTimeout(() => {
  //     setImpersonator(undefined);
  //   }, [3000]);
  // }, [setImpersonator]);

  const changeLink = () => {
    if (link === "signup") {
      setLink("login");
    } else {
      setLink("signup");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      loadUserProfile();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Fragment>
      <Redirect to="/login" />
      <Switch>
        <Route path="/login">
          <div className="auth__loginForm">
            <form onSubmit={handleSubmit} noValidate>
              <Field
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <Field
                name="password"
                label="Password"
                id="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button type="submit">Login</button>
            </form>
          </div>
        </Route>
        <Route path="/signup">
          <ProfileCreate changeLink={changeLink} />
        </Route>
      </Switch>
      {/* prettier-ignore */}
      <nav><ul>
        <li><Link to={`${link}`} onClick={changeLink}>{`${link}`}</Link></li>
      </ul></nav>
    </Fragment>
  );
};

export default AuthContainer;
