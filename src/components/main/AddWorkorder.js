import React, { Fragment, useState } from "react";
import Field from "./Field";

const Workorder = (props) => {
  const [workorderId, setWorkorderId] = useState(0);
  const [customer, setCustomer] = useState({});
  const [brand, setBrand] = useState({});
  const [model, setModel] = useState({});

  // const { updateWorkorderId } = props;
  // const handleSubmit = () => {
  //   updateWorkorderId();
  // };

  const addRecord = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/workorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workorderId, customer, brand, model }),
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
      <h4>New Workorder</h4>
      <form onSubmit={addRecord}>
        <Field
          label="Workorder ID"
          value={workorderId}
          name="workorderId"
          onChange={(e) => setWorkorderId(e.target.value)}
        />
        <Field
          label="Customer"
          value={customer}
          name="customer"
          onChange={(e) => setCustomer(e.target.value)}
        />
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
    </Fragment>
  );
};

// const handleSubmit = (event) => {
//   event.preventDefault();
// };

// }

export default Workorder;
