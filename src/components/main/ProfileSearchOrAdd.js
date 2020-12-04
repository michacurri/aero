import React, { Fragment } from "react";
import ProfilesSearch from "./ProfilesSearch";
import ProfileAdd from "./ProfileAdd";

const ProfileSearchOrAdd = ({
  refresh,
  profile,
  searchProfiles,
  addProfile,
  setProfile,
  searchOrAdd,
}) => {
  return (
    <Fragment>
      <button onClick={searchProfiles}>Search For a Profile</button>
      <button onClick={addProfile}>Add a new Profile</button>
      {searchOrAdd === "search" ? (
        <div className="profile__searchBox">
          <ProfilesSearch
            onAdd={refresh}
            profile={profile}
            setProfile={setProfile}
          />
        </div>
      ) : (
        <div className="profile__addBox">
          <ProfileAdd
            onAdd={refresh}
            profile={profile}
            setProfile={setProfile}
          />
        </div>
      )}
    </Fragment>
  );
};

export default ProfileSearchOrAdd;
