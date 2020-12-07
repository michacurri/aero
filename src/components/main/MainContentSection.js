import React, { useContext } from "react";
import { UserContext } from "../authorization/UserContext";
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
import AuthContainer from '../authorization/AuthContainer'

function MainContentSection({ loginClick }) {
  const [currentUser] = useContext(UserContext);

  // TODO
  //* if "LOGIN" clicked, show <Login />
  //? --- // if (!currentUser), show Login Options
  //? --- // else, show logged in Content
  //* else, show <AdvertHero />

  let content;
  if (loginClick) {
    if (currentUser) {
      console.log(currentUser);
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
      content = <AuthContainer />;
    }
  } else {
    content = <AdvertHero />;
  }

  return content;
}

export default MainContentSection;
