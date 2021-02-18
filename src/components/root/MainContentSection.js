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
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  main: {
    display: "flex",
    width: "90%",
    maxWidth: "1200px",
    margin: "0 auto",
    height: "100%",
  },
  sidebarWrapper: {
    width: "calc(100% / 4)",
    height: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "deepskyblue",
  },
  mainContentWrapper: {
    width: "calc(100% / 4 * 3)",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#5c677d",
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
        }
        if (json.data.admin === true) {
          setAdmin(json.data);
          setCurrentProfile(json.data);
        } else {
          setCurrentProfile(json.data);
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
        <div className={classes.main}>
          <section className={classes.sidebarWrapper}>
            <SidebarNav />
          </section>
          <section className={classes.mainContentWrapper}>
            <div className="mainContent">
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
        </div>
      );
    } else if (!admin && currentProfile) {
      content = (
        <div className="mainContentSection">
          <section id="sidebar__wrapper">
            <SidebarNav />
          </section>
          <section id="mainContent__wrapper">
            <div className="mainContent">
              <Redirect to="/home" render={() => <Home />} />
              {/* prettier-ignore */}
              <Switch>
                <Route path="/home" render={() => <Home />} />
                <Route path="/profile" render={() => <Profile admin={admin} currentProfile={currentProfile} />} />
                <Route path="/workorder" render={() => <Workorder admin={admin} currentProfile={currentProfile} loadUserProfile={loadUserProfile} />} />
              </Switch>
            </div>
          </section>
        </div>
      );
    } else {
      content = <AuthContainer loadUserProfile={loadUserProfile} />;
    }
  } else {
    content = (
      <Fragment>
        <Redirect exact to="/" />
        <AdvertHero />;
      </Fragment>
    );
  }

  return content;
}

export default MainContentSection;
