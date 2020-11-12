import React, { useState, createContext } from "react";
// import firebase from "../../backend/firebase";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged(setCurrentUser);
  // }, []);

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
        {props.children}
    </UserContext.Provider>
  );
};