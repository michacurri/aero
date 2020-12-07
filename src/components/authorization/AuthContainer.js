import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

import firebase from "../../backend/firebase";
// import { Redirect } from "react-router-dom";
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const AuthContainer = (props) => {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  useEffect(() => {
    auth.onAuthStateChanged = () => {
      setCurrentUser(currentUser);
    };
  }, [currentUser, setCurrentUser]);

  // const login = () => {
  //   // TODO - redirect to a login form
  //   console.log("login clicked");
  //   return <Link to="/login" />;
  // };

  const googleLogin = () => {
    auth.signInWithPopup(provider).then((result) => {
      setCurrentUser(result.user);
    });
  };

  const googleGuest = () => {
    auth.signInAnonymously().then((result) => {
      setCurrentUser(result.user);
    });
  };

  const logout = () => {
    // TODO - if statement to reflect either google logout or normal
    // TODO - redirect to <AdvertHero />
    auth.signOut().then(() => {
      setCurrentUser(null);
    });
  };

  return (
    //  prettier-ignore
    <div className="auth__buttons button">
      {currentUser ? <button onClick={logout}>Sign out</button> : null}
      {currentUser ? null : <button onClick={googleLogin}>Sign in with Google</button>}
      {currentUser ? null : <button onClick={googleGuest}>Sign in as a guest</button>}
    </div>
  );
};

export default AuthContainer;
