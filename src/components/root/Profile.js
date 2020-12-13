import React, { useContext, useState, Fragment } from "react";
import ProfileDisplay from "./ProfileDisplay";
import ProfileCreate from './ProfileCreate';
import ProfileSearch from './ProfilesSearch'
import { ImpersonatorContext } from "../../backend/authorization/ImpersonatorContext";
import { UserContext } from "../../backend/authorization/UserContext";

//  _______ Profile
// Return two buttons that control whether to Sign In or Sign Up or add
// On Login check if currentProfile exists in DB
// TODO - IF user is ADMIN show everything

const Profile = () => {
  const [impersonator] = useContext(ImpersonatorContext);
  const [currentProfile, setCurrentProfile] = useContext(UserContext);
  const [searchOrAdd, setSearchOrAdd] = useState(null);

  const searchProfiles = () => {
    setSearchOrAdd("search");
  };
  const addProfile = () => {
    setSearchOrAdd("add");
  };

  let content;
  if (impersonator) {
    if (!currentProfile._id) {
      content = (
        <Fragment>
          <button onClick={searchProfiles}>Search For a Profile</button>
          <button onClick={addProfile}>Add a new Profile</button>
          {searchOrAdd === "search" ? (
            <div className="profile__searchBox">
              <ProfileSearch
                currentProfile={currentProfile}
                setCurrentProfile={setCurrentProfile}
              />
            </div>
          ) : (
            <div className="profile__addBox">
              <ProfileCreate
                currentProfile={currentProfile}
                setCurrentProfile={setCurrentProfile}
              />
            </div>
          )}
        </Fragment>
      );
    } else {
      content = <ProfileDisplay currentProfile={currentProfile} />;
      // and show some additional settings, like change currentProfile
      // edit current currentProfile
      // add workorder
    }
  } else {
    content = <ProfileDisplay currentProfile={currentProfile} />;
  }
  return content;
};

export default Profile;
