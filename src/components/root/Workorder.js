import React, { useContext, Fragment } from "react";
import { UserContext } from "../../backend/authorization/UserContext";
import { ImpersonatorContext } from "../../backend/authorization/ImpersonatorContext";
import WorkorderDisplay from "./WorkorderDisplay";
import WorkorderCreate from "../admin/WorkorderCreate";

const Workorder = () => {
  const [currentProfile] = useContext(UserContext);
  const [impersonator] = useContext(ImpersonatorContext);

  let content;
  if (!impersonator) {
    content = (
      <Fragment>
        <WorkorderDisplay currentProfile={currentProfile} />
        <WorkorderCreate currentProfile={currentProfile} />
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <WorkorderDisplay currentProfile={currentProfile} />
        <h5>Admin Search options</h5>
        {/* below here only because impersonator has not been fully set up */}
        <WorkorderCreate currentProfile={currentProfile} />
      </Fragment>
    );
  }
  return content;
};

export default Workorder;
