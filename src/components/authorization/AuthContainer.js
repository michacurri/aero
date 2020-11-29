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
    // figured out need to use the following line:     eslint-disable-next-line
    // or enter [currentUser, setCurrentUser] into the dependency array

  }, [currentUser, setCurrentUser]);

  const login = () => {
    auth.signInWithPopup(provider).then((result) => {
      setCurrentUser(result.user);
    });
  };

  const guest = () => {
    auth.signInAnonymously().then((result) => {
      setCurrentUser(result.user);
    });
  };

  const logout = () => {
    auth.signOut().then(() => {
      setCurrentUser(null);
    });
  };

  return (
    //  prettier-ignore
    <div className="auth__buttons button">
      {currentUser ? <button onClick={logout} >Sign out</button> : null}
      {currentUser ? null : <button onClick={login}>Sign in with Google</button>}
      {currentUser ? null : <button onClick={guest}>Sign in as a guest</button>}
    </div>
  );
};

export default AuthContainer;
