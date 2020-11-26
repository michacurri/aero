import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // useParams,
} from "react-router-dom";
import Home from "./Home";
import SidebarNav from "./SidebarNav";
import AddWorkorder from "./AddWorkorder";
import Settings from "./Settings";
import AdvertHero from "./AdvertHero";
import { UserContext } from "../authorization/UserContext";

function MainContentSection() {
  const [currentUser] = useContext(UserContext);
  const [workorderId, setWorkorderId] = useState(0);


  const updateWorkorderId = () => {
     setWorkorderId(workorderId + 1);
    //  return setWorkorderId
  };
  console.log(workorderId);

  let content;
  if (currentUser) {
    content = (
      <Router>
        <div className="mainContentSection">
          <section id="sidebar__wrapper">
            <SidebarNav />
          </section>
          <section id="mainContent__wrapper">
            {/* prettier-ignore */}
            <Switch>
              <Route exact path="/" render={() => <Home />} />
              <Route path="/workorder" render={() => <AddWorkorder workorderId={workorderId} updateWorkorderId={updateWorkorderId} />} />
              <Route path="/settings" render={() => <Settings />} />
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

export default MainContentSection;
