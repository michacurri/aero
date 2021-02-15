import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ImpersonatorContext } from "../../backend/authorization/ImpersonatorContext";

function SidebarNav() {
  const [admin] = useContext(ImpersonatorContext);

  let content;
  if (admin) {
    content = (
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
  } else {
    content = (
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/workorder">Workorders</Link>
          </li>
        </ul>
      </nav>
    );
  }

  return content;
}

export default SidebarNav;
