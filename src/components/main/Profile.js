import React, { Fragment, useState, useEffect, useCallback } from "react";
import ProfilesSearch from './ProfilesSearch'
import ProfileAdd from './ProfileAdd'

const Profile = (props) => {
  const [hasProfile, setHasProfile] = useState(null);

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/profile");
      const profileRes = await response.json();
      // console.log(response);
      console.log(profileRes);
      // setProfile(profileRes);
    } catch (err) {
      console.log({ error: err });
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const searchProfiles = () => {
    setHasProfile("search");
  };
  const addProfile = () => {
    setHasProfile("add");
  };

  return (
    //  TODO
    //* RETURN AN IF STATEMENT
    //* THAT SWITCHES COMPONENTS
    //* BASED ON BUTTON CLICKS:
    //* "SEARCH FOR PROFILE" && "CREATE NEW PROFILE"

    <Fragment>
      <button onClick={searchProfiles}>Search For a Profile</button>
      <button onClick={addProfile}>Add a new Profile</button>
      <div className="profile__searchBox">
        {hasProfile === "search" ? <ProfilesSearch onAdd={refresh} profile={props.profile} /> : null}
      </div>
      <div className="profile__addBox">
        {hasProfile === "add" ? <ProfileAdd onAdd={refresh} profile={props.profile} /> : null}
      </div>
    </Fragment>
  );
};

export default Profile;
