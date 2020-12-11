import React from "react";
import { Link } from "react-router-dom";

function SidebarNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/profile">Profiles</Link>
        </li>
        <li>
          <Link to="/workorder">Workorders</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SidebarNav;
