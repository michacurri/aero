import React, { useContext, Fragment } from "react";
import { UserContext } from "../../backend/authorization/UserContext";
import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./Home";
import SidebarNav from "./SidebarNav";
import Profile from "./Profile";
import Workorder from "./Workorder";
import Settings from "../admin/Settings";
import AdvertHero from "./AdvertHero";
import AuthContainer from "../../backend/authorization/AuthContainer";

function MainContentSection({ loginClick }) {
  const [currentProfile] = useContext(UserContext);

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
                <Route path="/profile" render={() => <Profile currentProfile={currentProfile} />} />
                <Route path="/workorder" render={() => <Workorder />} />
                <Route path="/settings" render={() => <Settings />} />
              </Switch>
            </div>
          </section>
        </div>
      );
    } else {
      content = <AuthContainer />;
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
