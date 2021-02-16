import React, { useState, Fragment } from "react";
import ProfileCreate from "./ProfileCreate";
import ProfileDisplay from "./ProfileDisplay";
import ProfileSearch from "./ProfilesSearch";

//  _______ Profile
// Return two buttons that control whether to Sign In or Sign Up or add
// On Login check if currentProfile exists in DB
// IF user is ADMIN show everything

const Profile = ({ admin, currentProfile, setCurrentProfile }) => {
  let content;
  if (admin) {
    if (!currentProfile._id) {
      content = (
        <Fragment>
        <div className="profile__searchBox">
          <ProfileSearch
            currentProfile={currentProfile}
            setCurrentProfile={setCurrentProfile}
          />
        </div>
        <div className="profile__createBox">
          <ProfileCreate />
        </div>
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
    // TODO - button to remove profile
  }
  return content;
};

export default Profile;
