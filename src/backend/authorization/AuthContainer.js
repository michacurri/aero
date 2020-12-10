import React, { useContext, useEffect, useCallback } from "react";
import { UserContext } from "./UserContext";
import { ImpersonatorContext } from "./ImpersonatorContext";
import AuthLoginSignup from "./AuthLoginSignup";
// import firebase from "../firebase";
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

const AuthContainer = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [impersonator, setImpersonator] = useContext(ImpersonatorContext);

  const getProfile = useCallback(async () => {
    try {
      const response = await fetch("/profile/this");
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setCurrentUser(json.data);
    } catch (err) {
      console.log(err);
      setCurrentUser(undefined);
    }
  }, [setCurrentUser]);

  useEffect(() => {
    // auth.onAuthStateChanged = () => {
    //   setCurrentUser(currentUser);
    // };
    getProfile();
  }, [getProfile]);

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
    auth.signOut().then(() => {
      setCurrentUser(null);
    });
  };

  return (
    <AuthLoginSignup
      currentUser={currentUser}
      googleLogin={googleLogin}
      googleGuest={googleGuest}
      logout={logout}
      getProfile={getProfile}
    />
  );
};

export default AuthContainer;
