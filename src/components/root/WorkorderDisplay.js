import React from "react";

const WorkorderDisplay = ({ currentUserProfile }) => {
  const { workorders } = currentUserProfile;
  console.log(workorders);
  const allWorkorders = workorders.map((workorder, index) => {
    return (
      <div key={index} className="workorderDisplay__eachWorkorder">
        <ul id={workorder._id}>
          <li>Brand: {workorder.brand}</li>
          <li>Model: {workorder.model}</li>
          <li>Colour: {workorder.colour}</li>
        </ul>
      </div>
    );
  });
  return allWorkorders;
};

export default WorkorderDisplay;
