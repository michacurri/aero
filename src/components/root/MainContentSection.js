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

function MainContentSection({ loginClick }) {
  const [admin] = useContext(ImpersonatorContext);
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
        setCurrentProfile(json.data);
      } catch (err) {
        console.log(err);
        setCurrentProfile(undefined);
      }
    },
    [setCurrentProfile]
  );

  let content;
  if (loginClick) {
    if (currentProfile) {
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
                <Route path="/workorder" render={() => <Workorder currentProfile={currentProfile} loadUserProfile={loadUserProfile} />} />
                <Route path="/settings" render={() => <Settings />} />
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
