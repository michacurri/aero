import React, { Fragment, useState } from "react";
import WorkorderEditor from "../root/WorkorderEditor";

const WorkorderAdd = ({ currentProfile }) => {
  const [workorder, setWorkorder] = useState();

  const updateWorkorderField = (e) => {
    const workorderState = { ...workorder };
    workorderState[e.target.name] = e.target.value;
    setWorkorder(workorderState);
  };

  const addRecord = async (e) => {
    e.preventDefault();
    try {
      const userId = currentProfile.id;
      const { brand, model, colour } = workorder;
      const response = await fetch(`/api/workorder/create/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, model, colour }),
      });
      if (response.ok) {
        // onNewWorkorder(response);
        console.log(response);
      } else {
        console.log("Error saving record");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Fragment>
      <div className="main__child form__wrapper">
        <h4>New Workorder</h4>
        <form onSubmit={addRecord}>
          <WorkorderEditor
            workorder={workorder}
            onChange={updateWorkorderField}
          />
          <input type="submit" value="Save" />
        </form>
      </div>
    </Fragment>
  );
};

export default WorkorderAdd;
