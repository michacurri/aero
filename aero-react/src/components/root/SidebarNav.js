import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ImpersonatorContext } from "../../backend/authorization/ImpersonatorContext";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import Collapse from "@material-ui/core/Collapse";
import FingerprintSharpIcon from "@material-ui/icons/FingerprintSharp";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import AssignmentSharpIcon from "@material-ui/icons/AssignmentSharp";
import DirectionsBikeSharpIcon from '@material-ui/icons/DirectionsBikeSharp';
import TuneSharpIcon from "@material-ui/icons/TuneSharp";
import { Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function SidebarNav() {
  const classes = useStyles();
  const [admin] = useContext(ImpersonatorContext);

  let content;
  if (admin) {
    content = (
      <Paper elevation={3} className={classes.root}>
        <List component="nav" aria-labelledby="nested-list-subheader">
          <ListItem button component={Link} to={"/home"}>
            <ListItemIcon>
              <HomeSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to={"/profile"}>
            <ListItemIcon>
              <FingerprintSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Profiles" />
          </ListItem>
          <ListItem button component={Link} to={"/workorder"}>
            <ListItemIcon>
              <AssignmentSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Workorders" />
          </ListItem>
          <ListItem button component={Link} to={"/services"}>
            <ListItemIcon>
              <DirectionsBikeSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Services" />
          </ListItem>
          <ListItem button component={Link} to={"/settings"}>
            <ListItemIcon>
              <TuneSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Paper>
    );
  } else {
    content = (
      <Paper elevation={3} className={classes.root}>
        <List component="nav" aria-labelledby="nested-list-subheader">
          <ListItem button component={Link} to={"/home"}>
            <ListItemIcon>
              <HomeSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to={"/profile"}>
            <ListItemIcon>
              <FingerprintSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Profiles" />
          </ListItem>
          <ListItem button component={Link} to={"/workorder"}>
            <ListItemIcon>
              <AssignmentSharpIcon />
            </ListItemIcon>
            <ListItemText primary="Workorders" />
          </ListItem>
        </List>
      </Paper>
    );
  }

  return content;
}

export default SidebarNav;
