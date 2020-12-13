import React, { Fragment, useState } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import ProfileCreate from "../../components/root/ProfileCreate";
import Field from "../../components/root/Field";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function AuthLoginSignup({ loadUserProfile }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [link, setLink] = useState("signup");

  function redirectHome() {
    return <Redirect to="/home" />;
  }

  const changeLink = () => {
    if (link === "signup") {
      setLink("login")
    } else {
      setLink("signup")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/profile/login", {
        method: "POST",
        headers: headers,
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
          <ProfileCreate />
        </Route>
      </Switch>
      {/* prettier-ignore */}
      <nav><ul>
          <li><Link to={`${link}`} onClick={changeLink}>{`${link}`}</Link></li>
        </ul></nav>
    </Fragment>
  );
}

export default AuthLoginSignup;
