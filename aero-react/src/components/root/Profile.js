import React from "react";
import ProfileDisplay from "./ProfileDisplay";
import ProfileSearch from "./ProfilesSearch";

const Profile = ({ admin, currentProfile, setCurrentProfile }) => {
  let content;
  if (admin) {
    // if (!currentProfile._id) {
    content = (
      // <div className={classes.profile__searchBox}>
        <ProfileSearch
          currentProfile={currentProfile}
          setCurrentProfile={setCurrentProfile}
        />
      // </div>
    );
    // } else {
    //   content = <ProfileDisplay currentProfile={currentProfile} />;
    //   // and show some additional settings, like change currentProfile
    //   // edit current currentProfile
    //   // add workorder
    // }
  } else {
    content = <ProfileDisplay currentProfile={currentProfile} />;
    // TODO - button to remove profile
  }
  return content;
};

export default Profile;
