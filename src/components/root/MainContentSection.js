import React, { useCallback, useContext, useEffect } from "react";
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
  const [currentUserProfile] = useContext(UserContext);

  // TODO
  //* if "LOGIN" clicked, show <Login />
  //? --- // if (!currentUserProfile), show Login Options
  //? --- // else, show logged in Content
  //* else, show <AdvertHero />

  const toggleRoute = useCallback(() => {
    if (loginClick) {
      return <Redirect exact from="/" to="/login" />;
    } else {
      return <Redirect exact from="/login" to="/" />;
    }
  }, [loginClick]);

  useEffect(() => {
    toggleRoute();
  }, [toggleRoute]);

  let content;
  if (loginClick) {
    if (currentUserProfile) {
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
                <Route path="/profile" render={() => <Profile currentUserProfile={currentUserProfile} />} />
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
    content = <AdvertHero />;
  }

  return content;
}

export default MainContentSection;
