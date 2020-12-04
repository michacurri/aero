import React, {
  useContext,
} from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./Home";
import SidebarNav from "./SidebarNav";
import Profile from "./Profile";
import WorkorderAdd from "./WorkorderAdd";
import Settings from "./Settings";
import AdvertHero from "./AdvertHero";
import { UserContext } from "../authorization/UserContext";

// function reducer(state, action) {
  // return { profile: }
// }

function MainContentSection() {
  const [currentUser] = useContext(UserContext);
  // const [state, dispatch] = useReducer(reducer, { profile: profile });

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
              <Redirect to="/home" render={() => <Home />} />
              {/* prettier-ignore */}
              <Switch>
                <Route path="/home" render={() => <Home />} />
                <Route path="/profile" render={() => <Profile currentUser={currentUser} />} />
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
