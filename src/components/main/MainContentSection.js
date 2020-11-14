import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AdvertHero from "./AdvertHero";
import Sidebar from "../admin/Sidebar";
import Workorder from "./Workorder";
import { UserContext } from "../authorization/UserContext";

const MainContentSection = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);

  return (
    <Router>
      {!currentUser ? <Route exact path="/" render={() => <AdvertHero />} /> : (     
        <div className="mainContentSection">
          <Sidebar />
          <Workorder />
        </div>
      )
      }
    </Router>
  );
};

export default MainContentSection;
