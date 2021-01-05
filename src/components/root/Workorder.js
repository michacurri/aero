import React, { useContext, Fragment, useState } from "react";
// import { UserContext } from "../../backend/authorization/UserContext";
// import { ImpersonatorContext } from "../../backend/authorization/ImpersonatorContext";
import WorkorderDisplay from "./WorkorderDisplay";
import WorkorderCreate from "../admin/WorkorderCreate";

const Workorder = ({ currentProfile, loadUserProfile, admin }) => {
  // const [currentProfile] = useContext(UserContext);
  // const [admin] = useContext(ImpersonatorContext);
  const [workView, setWorkView] = useState("display");

  function workorderClick() {
    if (workView === "display") {
      setWorkView("create");
    } else {
      setWorkView("display");
    }
  }

  let content;
  if (!admin) {
    content = (
      <Fragment>
        {workView === "display" ? (
          <Fragment>
            <button onClick={workorderClick}>Create new Workorder</button>
            <WorkorderDisplay currentProfile={currentProfile} />
          </Fragment>
        ) : (
          <Fragment>
            <button onClick={workorderClick}>View Workorders</button>
            <WorkorderCreate
              currentProfile={currentProfile}
              loadUserProfile={loadUserProfile}
            />
          </Fragment>
        )}
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <WorkorderDisplay currentProfile={currentProfile} />
        <h5>Admin Search options</h5>
        {/* below here only because admin has not been fully set up */}
        <WorkorderCreate currentProfile={currentProfile} />
      </Fragment>
    );
  }
  return content;
};

export default Workorder;
