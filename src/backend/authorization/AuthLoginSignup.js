import React, { Fragment, useState } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import ProfileCreate from "../../components/user/ProfileCreate";
import Field from "../../components/user/Field";

function AuthLoginSignup({
  currentUser,
  getProfile,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  function redirectHome() {
    return <Redirect to="/home" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ email, password });
    try {
      const response = await fetch("/profile/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      // console.log(data);
      if (!response.ok) {
        throw new Error(data.message);
      }
      // calling getProfile() in Profile.js
      // call /profile/this, get info about user with NEW token
      getProfile();
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
              {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
              <button type="submit">Sign In</button>
            </form>
          </div>
          {/* prettier-ignore */}
          {/* <div className="auth__buttons button">
            {currentUser ? <button onClick={logout}>Sign out</button> : null}
            {currentUser ? null : (<button onClick={googleLogin}>Sign in with Google</button>)}
            {currentUser ? null : (<button onClick={googleGuest}>Sign in as a guest</button>)}
          </div> */}
        </Route>
        <Route path="/signup">
          <ProfileCreate />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default AuthLoginSignup;
