import React, {
  Fragment,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import ProfileDisplay from "./ProfileDisplay";
import ProfileSearchOrAdd from "../admin/ProfileSearchOrAdd";
import { UserContext } from "../../backend/authorization/UserContext";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

//  _______ Profile
// Return two buttons that control whether to search or add
// On Login with Google OAuth, check if profile exists in DB
// -- load profile if it exists; else send to "add new"

const Profile = () => {
  const [currentUser] = useContext(UserContext);
  const [searchOrAdd, setSearchOrAdd] = useState(null);
  const [profile, setProfile] = useState({});

  const refreshProfile = useCallback(async () => {
    try {
      const userEmail = currentUser.email;
      const response = await fetch(`/profile/search/email/${userEmail}`, {
        method: "GET",
        headers: headers,
        body: JSON.stringify({ email: userEmail }),
      });
      console.log(response);
      const profileRes = await response.json();
      setProfile(profileRes[0]);
    } catch (err) {
      console.log(err);
    }
  }, [setProfile]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile()]);

  const searchProfiles = () => {
    setSearchOrAdd("search");
  };
  const addProfile = () => {
    setSearchOrAdd("add");
  };

  return (
    <Fragment>
      {!profile._id ? (
        <ProfileSearchOrAdd
          // <ProfileCreate
          profile={profile}
          searchOrAdd={searchOrAdd}
          searchProfiles={searchProfiles}
          addProfile={addProfile}
          setProfile={setProfile}
        />
      ) : (
        <ProfileDisplay profile={profile} />
      )}
    </Fragment>
  );
};

export default Profile;
