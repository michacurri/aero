import React, { Fragment, useState } from "react";
import WorkorderEditor from "../root/WorkorderEditor";

const WorkorderAdd = (props) => {
  const [workorder, setWorkorder] = useState();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  // const [colour, setColour] = useState("");
  // const [status, setStatus] = useState([]);
  // const [service, setService] = useState([]);

  const addRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/workorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brand, model }),
      });
      if (response.ok) {
        props.onAdd();
      } else {
        console.log("Error saving record");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Fragment>
      {/* <div className="main__child customer__wrapper">
        <Customer customer={customer}/>
      </div> */}
      <div className="main__child form__wrapper">
        <h4>New Workorder</h4>
        <form onSubmit={addRecord}>
          <WorkorderEditor workorder={workorder} onChange={addRecord} />
          <input type="submit" value="Save" />
        </form>
      </div>
    </Fragment>
  );
};

// const handleSubmit = (event) => {
//   event.preventDefault();
// };

// }

export default WorkorderAdd;
