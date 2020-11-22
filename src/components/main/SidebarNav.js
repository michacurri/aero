import React from "react";
import { Link } from "react-router-dom";

function SidebarNav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/workorder">Workorder</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}

export default SidebarNav;
