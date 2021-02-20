import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FingerprintSharpIcon from "@material-ui/icons/FingerprintSharp";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const ProfileDisplay = ({ currentProfile }) => {
  const classes = useStyles();
  const { firstName, lastName, phone, email } = currentProfile;
  return (
    <Fragment>
      <List
        // component="nav"
        aria-labelledby="nested-list-subheader"
        className={classes.root}
      >
        <ListItemIcon>
          <FingerprintSharpIcon />
        </ListItemIcon>
        <ListItemText primary={firstName} />
      </List>
      {/* <div className="profile__contact">
        <ul>
          <li>{firstName}</li>
          <li>{lastName}</li>
          <li>{phone}</li>
          <li>{email}</li>
        </ul>
      </div> */}
    </Fragment>
  );
};

export default ProfileDisplay;
