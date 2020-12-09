import React, {
  Fragment,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import ProfileDisplay from "./ProfileDisplay";
import ProfileSearchOrAdd from "../admin/ProfileSearchOrAdd";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

//  _______ Profile
// Return two buttons that control whether to search or add
// On Login with Google OAuth, check if profile exists in DB
// -- load profile if it exists; else send to "add new"

const Profile = ({ currentUser }) => {
  const [searchOrAdd, setSearchOrAdd] = useState(null);
  const [profile, setProfile] = useState({});
  const allProfiles = useRef({});
  const parseObject = useRef({});

  const refresh = useCallback(async () => {
    setProfile({});
    try {
      const response = await fetch(`/profile/search/all`);
      const profileRes = await response.json();
      allProfiles.current = profileRes;
    } catch (err) {
      console.log({ err });
    }
  }, []);

  const getProfile = useCallback(async () => {
    try {
      const response = await fetch("/profile/this");
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      }
      setProfile(json.data);
    } catch (err) {
      console.log(err);
      setProfile(undefined);
    }
  }, [setProfile]);


  //* send user object to search and return a profile
  //TODO - if no profile exists, set up a new one
  const preloadQuery = useCallback(async () => {
    try {
      const response = await fetch(
        `/profile/search/email/${parseObject.current.email}`,
        {
          method: "GET",
          headers: headers,
        }
      );
      const profileRes = await response.json();
      setProfile(profileRes[0]);
    } catch (err) {
      console.log(err);
    }
  }, [setProfile]);

  //* handling Google Auth users
  //* pull pertinent information from currentUser
  const preloadParse = useCallback(async () => {
    if (currentUser.displayName !== null) {
      const firstLast = await currentUser.displayName;
      const firstName = await firstLast.split(" ").shift();
      const lastName = await firstLast.split(" ").pop();
      const phone = await currentUser.phone;
      const email = await currentUser.email;
      const uid = await currentUser.uid;
      parseObject.current = {
        firstName,
        lastName,
        phone,
        email,
        uid,
      };
      const parseJson = JSON.stringify(parseObject);
      console.log(parseJson);
      return preloadQuery(parseJson);
    } else return null;
  }, [currentUser, preloadQuery]);

  useEffect(() => {
    refresh();
    getProfile()
    preloadParse();
  }, [refresh, getProfile, preloadParse]);

  const searchProfiles = () => {
    setSearchOrAdd("search");
  };
  const addProfile = () => {
    setSearchOrAdd("add");
  };

  //! CHANGE BELOW TO INCLUDE ProfileSearchOrAdd.js functionality
  return (
    <Fragment>
      {!profile._id ? (
        <ProfileCreate
          profile={profile}
          searchOrAdd={searchOrAdd}
          getProfile={getProfile}
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
