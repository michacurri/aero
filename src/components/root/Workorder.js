import React, { useContext, Fragment } from "react";
import { UserContext } from "../../backend/authorization/UserContext";
import { ImpersonatorContext } from "../../backend/authorization/ImpersonatorContext";
import WorkorderDisplay from "./WorkorderDisplay";
import WorkorderCreate from "../admin/WorkorderCreate";

const Workorder = () => {
  const [currentUserProfile] = useContext(UserContext);
  const [impersonator] = useContext(ImpersonatorContext);

  const { workorder } = currentUserProfile;
  console.log(workorder);

  let content;
  if (!impersonator) {
    if (workorder) {
      content = <WorkorderDisplay currentUserProfile={currentUserProfile} />;
    } else {
      content = <h5>No workorders on file</h5>;
    }
  }
  if (workorder) {
    content = (
      <Fragment>
        <WorkorderDisplay currentUserProfile={currentUserProfile} />
        <h5>Admin Search options</h5>
        <WorkorderCreate />
      </Fragment>
    );
  } else {
    content = <WorkorderCreate />;
  }
  return content;
};

export default Workorder;
