import React, { useContext, Fragment, useCallback } from "react";
import { UserContext } from "../../backend/authorization/UserContext";
import { ImpersonatorContext } from "../../backend/authorization/ImpersonatorContext";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./Home";
import SidebarNav from "./SidebarNav";
import Profile from "./Profile";
import Workorder from "./Workorder";
import Settings from "../admin/Settings";
import AdvertHero from "./AdvertHero";
import AuthContainer from "../../backend/authorization/AuthContainer";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   justifyContent: "center",
  //   // flexGrow: 1,
  //   "& > *": {
  //     margin: theme.spacing(1),
  //   },
  //   backgroundColor: theme.palette.primary.dark,
  // },
  main__section__wrapper: {
    height: "100%",
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    backgroundColor: "#5c677d",
  },
  sidebar__wrapper: {
    width: "calc(100% / 4)",
    height: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "deepskyblue",
  },
  main__content: {
    height: "100%",
    width: "calc(100% / 4 * 3)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

function MainContentSection({ loginClick }) {
  const classes = useStyles();
  const [admin, setAdmin] = useContext(ImpersonatorContext);
  const [currentProfile, setCurrentProfile] = useContext(UserContext);

  const loadUserProfile = useCallback(
    async function () {
      try {
        const response = await fetch("/api/profile/this-profile", {
          headers: {
            credentials: "include",
          },
        });
        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.message);
        } else {
          if (json.data.admin === true) {
            setAdmin(json.data);
            setCurrentProfile(json.data);
          } else {
            setCurrentProfile(json.data);
          }
        }
      } catch (err) {
        console.log(err);
        setAdmin(undefined);
        setCurrentProfile(undefined);
      }
    },
    [setCurrentProfile, setAdmin]
  );
  let content;
  if (loginClick) {
    if (admin) {
      content = (
        <section className={classes.main__section__wrapper}>
          <div className={classes.sidebar__wrapper}>
            <SidebarNav />
          </div>
          <div className={classes.main__content}>
            <Redirect to="/home" render={() => <Home />} />
            {/* prettier-ignore */}
            <Switch>
                <Route path="/home" render={() => <Home />} />
                <Route path="/profile" render={() => <Profile admin={admin} currentProfile={currentProfile} setCurrentProfile={setCurrentProfile}/>} />
                <Route path="/workorder" render={() => <Workorder admin={admin} currentProfile={currentProfile} loadUserProfile={loadUserProfile} />} />
                <Route path="/settings" render={() => <Settings />} />
              </Switch>
          </div>
        </section>
      );
    } else if (!admin && currentProfile) {
      content = (
        <section className={classes.main__section__wrapper}>
          <div className={classes.sidebar__wrapper}>
            <SidebarNav />
          </div>
          <div className={classes.main__content}>
            <Redirect to="/home" render={() => <Home />} />
            {/* prettier-ignore */}
            <Switch>
                <Route path="/home" render={() => <Home />} />
                <Route path="/profile" render={() => <Profile admin={admin} currentProfile={currentProfile} />} />
                <Route path="/workorder" render={() => <Workorder admin={admin} currentProfile={currentProfile} loadUserProfile={loadUserProfile} />} />
              </Switch>
          </div>
        </section>
      );
    } else {
      content = <AuthContainer loadUserProfile={loadUserProfile} />;
    }
  } else {
    content = (
      <Fragment>
        <Redirect exact to="/" />
        <AdvertHero />
      </Fragment>
    );
  }

  return content;
}

export default MainContentSection;
