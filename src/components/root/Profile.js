import React, { useState, Fragment } from "react";
import ProfileDisplay from "./ProfileDisplay";
import ProfileCreate from "./ProfileCreate";
import ProfileSearch from "./ProfilesSearch";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

//  _______ Profile
// Return two buttons that control whether to Sign In or Sign Up or add
// On Login check if currentProfile exists in DB
// IF user is ADMIN show everything

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    backgroundColor: "#558564",
    color: "#E0E0E0",
    padding: "2rem",
  },
}));

const Profile = ({ admin, currentProfile, setCurrentProfile }) => {
  const classes = useStyles();
  const [searchOrAdd, setSearchOrAdd] = useState(null);

  const searchProfiles = () => {
    setSearchOrAdd("search");
  };
  const addProfile = () => {
    setSearchOrAdd("add");
  };

  let content;
  if (admin) {
    if (!currentProfile._id) {
      content = (
        <Fragment>
          <Button className={classes.button} onClick={searchProfiles}>Search For a Profile</Button>
          <Button className={classes.button} onClick={addProfile}>Add a new Profile</Button>
          {searchOrAdd === "search" ? (
            <div className="profile__searchBox">
              <ProfileSearch
                currentProfile={currentProfile}
                setCurrentProfile={setCurrentProfile}
              />
            </div>
          ) : (
            <div className="profile__addBox">
              <ProfileCreate />
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
