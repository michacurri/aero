import React, { Fragment, useState } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import ProfileCreate from "../../components/root/ProfileCreate";
import Field from "../../components/root/Field";

function AuthLoginSignup({ loadUserProfile }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function redirectHome() {
    return <Redirect to="/home" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/profile/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      loadUserProfile();
      redirectHome();
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Redirect to="/login" />
      {/* prettier-ignore */}
      <nav><ul>
          <li><Link to="/login">Sign In</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul></nav>
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
                // type="password"
                id="password"
                // autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button type="submit">Sign In</button>
            </form>
          </div>
        </Route>
        <Route path="/signup">
          <ProfileCreate />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default AuthLoginSignup;
