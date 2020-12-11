import React, { Fragment, useState } from "react";
import Field from "../root/Field";
// import Customer from "./Customer";

const WorkorderAdd = (props) => {
  // const [workorderId, setWorkorderId] = useState(0);
  const [brand, setBrand] = useState({});
  const [model, setModel] = useState({});

  // const { updateWorkorderId } = props;
  // const handleSubmit = () => {
  //   updateWorkorderId();
  // };

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
          {/* //!  CHANGE TO A LABEL ONLY*/}
          {/* <Field
          label="Workorder ID"
          value={workorderId}
          name="workorderId"
          onChange={(e) => setWorkorderId(e.target.value)}
        /> */}
          {/* //!  */}
          <Field
            label="Brand"
            value={brand}
            name="brand"
            onChange={(e) => setBrand(e.target.value)}
          />
          <Field
            label="Model"
            value={model}
            name="model"
            onChange={(e) => setModel(e.target.value)}
          />
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
