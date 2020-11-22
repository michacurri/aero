import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // useParams,
} from "react-router-dom";
import Home from "./Home";
import SidebarNav from "./SidebarNav";
import Workorder from "./Workorder";
import Settings from "../admin/Settings";
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
              <Route exact path="/" component={Home} />
              <Route path="/workorder" render={() => <Workorder workorderId={workorderId} updateWorkorderId={updateWorkorderId} />} />
              <Route path="/settings" component={Settings} />
              {/* <Route render={() => <Workorder onChange={value => setWorkorderId(value)} /> } /> */}
              {/* <Route path="/:id" children={<Child />} /> */}
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

// function Child() {
//   let { id } = useParams();
//   return <h3>this is the {id}</h3>;
// }

export default MainContentSection;
