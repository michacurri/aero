import React, { Fragment, useState, useEffect, useCallback, useRef } from "react";
import ProfilesSearch from "./ProfilesSearch";
import ProfileAdd from "./ProfileAdd";

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

//  _______ Profile
// Return two buttons that control whether to search or add
// On Login with Google OAuth, check if profile exists in DB
// -- load profile if it does exist, else send to "add new" 

const Profile = ({ currentUser }) => {
  const [searchOrAdd, setSearchOrAdd] = useState(null);
  const [profile, setProfile] = useState({});
  // const [allProfiles, setAllProfiles] = useState({});
  const allProfiles = useRef({})
  const parseObject = useRef({})

  const refresh = useCallback(async () => {
    try {
      const response = await fetch(`/profile/search/all`);
      const profileRes = await response.json();
      allProfiles.current = profileRes;
    } catch (err) {
      console.log({ err });
    }
  }, []);

  //* send user object to search and return a profile
  //TODO - if no profile exists, set up a new one
  const preloadQuery = useCallback(async () => {
    try {
      const response = await fetch(`/profile/search/email/${parseObject.current.email}`, {
        method: "GET",
        headers: headers,
      });
      const profileRes = await response.json();
      setProfile(profileRes);
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }, []);

  //* handling Google Auth users
  //* pull pertinent information from currentUser
  const preloadParse = useCallback(async () => {
    if (currentUser.displayName !== null) {
      const firstLast = await currentUser.displayName;
      const firstName = await firstLast.split(" ").shift();
      const lastName = await firstLast.split(" ").pop();
      const email = await currentUser.email;
      const phone = await currentUser.phone;
      const uid = await currentUser.uid;
      parseObject.current = {
        firstName,
        lastName,
        email,
        phone,
        uid,
      };
      const parseJson = JSON.stringify(parseObject);
      return preloadQuery(parseJson);
    } else return null;
  }, [currentUser, preloadQuery]);

  useEffect(() => {
    refresh();
    preloadParse();
  }, [refresh, preloadParse]);
  
  const searchProfiles = () => {
    setSearchOrAdd("search");
  };
  const addProfile = () => {
    setSearchOrAdd("add");
  };

  return (
    <Fragment>
      <button onClick={searchProfiles}>Search For a Profile</button>
      <button onClick={addProfile}>Add a new Profile</button>
      <div className="profile__searchBox">
        {searchOrAdd === "search" ? (
          <ProfilesSearch
            onAdd={refresh}
            profile={profile}
            setProfile={setProfile}
          />
        ) : null}
      </div>
      <div className="profile__addBox">
        {searchOrAdd === "add" ? (
          <ProfileAdd
            onAdd={refresh}
            profile={profile}
            setProfile={setProfile}
          />
        ) : null}
      </div>
    </Fragment>
  );
};

export default Profile;
