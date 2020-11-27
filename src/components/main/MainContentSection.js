import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams,
} from "react-router-dom";
import Sidebar from "../admin/Sidebar";
import Workorder from "./WorkorderComp";
import AdvertHero from "./AdvertHero";
import Settings from "../admin/Settings";
import { UserContext } from "../authorization/UserContext";

export default function MainContentSection() {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  let content;
  if (currentUser) {
    content = (
      <Router>
        <div className="mainContentSection">
          <section id="sidebar__wrapper">
            <Sidebar />
          </section>
          <section id="mainContent__wrapper">
            <Switch>
              <Route path="/:id" children={<Child />} />
            </Switch>
          </section>
        </div>
      </Router>
    );
  } else {
    content = <AdvertHero />;
  }

  return content;
}

function Child() {
  let { id } = useParams();
  return <h3>this is the {id}</h3>;
}

// export default MainContentSection;
