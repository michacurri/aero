import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function SidebarLinks(props) {
  return (
    <Router>
      <div className="sidebarLinks">
        <ul>
          <li>
            <Link to="/workorder">Workorder</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </div>
    </Router>
  );
}

export default SidebarLinks;
