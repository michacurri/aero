import React, { useContext, useEffect, useCallback } from "react";
import { UserContext } from "./UserContext";
import { ImpersonatorContext } from "./ImpersonatorContext";
import AuthLoginSignup from "./AuthLoginSignup";

const AuthContainer = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [impersonator, setImpersonator] = useContext(ImpersonatorContext);

  const loadUserProfile = useCallback(
    async function () {
      try {
        const response = await fetch("/profile/this", {
          headers: {
            credentials: "include",
          },
        });
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.message);
        }
        setCurrentUser(json.data);
      } catch (err) {
        console.log(err);
        setCurrentUser(undefined);
      }
    },
    [setCurrentUser]
  );

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  return (
    <AuthLoginSignup
      loadUserProfile={loadUserProfile}
    />
  );
};

export default AuthContainer;
