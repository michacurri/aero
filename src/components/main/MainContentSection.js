import React, { useCallback, useContext, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  // useParams,
} from "react-router-dom";
import Home from "./Home";
import SidebarNav from "./SidebarNav";
import Profile from "./Profile";
import WorkorderAdd from "./WorkorderAdd";
import Settings from "./Settings";
import AdvertHero from "./AdvertHero";
import { UserContext } from "../authorization/UserContext";

function MainContentSection() {
  const [currentUser] = useContext(UserContext);
  const [profile, setProfile] = useState({});

  const refresh = useCallback(async () => {
    try {
      const response = await fetch("/profile");
      const profileRes = await response.json();
      setProfile(profileRes);
      console.log(response);
      // * IF WORKORDER REQUESTS ARE REQUIRED
      // const secondResponse = await fetch("/api/workorders");
      // const workorderRes = await secondResponse.json();
      // setWorkorders(workorderRes);

    } catch (err) {
      console.log({err});
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  let content;
  if (currentUser) {
    content = (
      <Router>
        <div className="mainContentSection">
          <section id="sidebar__wrapper">
            <SidebarNav />
          </section>
          <section id="mainContent__wrapper">
            <div className="mainContent">
              <Redirect to="/home" render={() => <Home profile={profile} />} />
              {/* prettier-ignore */}
              <Switch>
                <Route path="/home" render={() => <Home profile={profile}/>} />
                <Route path="/profile" render={() => <Profile profile={profile} />} />
                <Route path="/workorder" render={() => <WorkorderAdd />} />
                <Route path="/settings" render={() => <Settings />} />
              </Switch>
            </div>
          </section>
        </div>
      </Router>
    );
  } else {
    content = <AdvertHero />;
  }

  return content;
}

export default MainContentSection;
