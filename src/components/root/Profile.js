import React, { useContext, useState } from "react";
import ProfileDisplay from "./ProfileDisplay";
import ProfileSearchOrAdd from "../admin/ProfileSearchOrAdd";
import { ImpersonatorContext } from "../../backend/authorization/ImpersonatorContext";
import { UserContext } from "../../backend/authorization/UserContext";

// const headers = {
//   Accept: "application/json",
//   "Content-Type": "application/json",
// };

//  _______ Profile
// Return two buttons that control whether to Sign In or Sign Up or add
// On Login check if profile exists in DB
// TODO - IF user is ADMIN show everything

const Profile = () => {
  const [impersonator] = useContext(ImpersonatorContext);
  const [currentProfile] = useContext(UserContext);
  const [searchOrAdd, setSearchOrAdd] = useState(null);
  // const [profile, setProfile] = useState({});
  // console.log(currentProfile);

  // const refreshProfile = useCallback(async () => {
  //   try {
  //     const userEmail = currentProfile.email;
  //     const response = await fetch(`/profile/search/email/${userEmail}`, {
  //       method: "GET",
  //       headers: headers,
  //     });
  //     console.log(response);
  //     const profileRes = await response.json();
  //     setProfile(profileRes[0]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [setProfile, currentProfile]);

  // useEffect(() => {
  //   refreshProfile();
  // }, [refreshProfile]);

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
        <ProfileSearchOrAdd
          searchOrAdd={searchOrAdd}
          searchProfiles={searchProfiles}
          addProfile={addProfile}
          // setProfile={setProfile}
        />
      );
    } else {
      content = <ProfileDisplay currentProfile={currentProfile} />;
      // and show some additional settings, like change profile
    }
  } else {
    content = <ProfileDisplay currentProfile={currentProfile} />;
  }
  return content;
};

export default Profile;
