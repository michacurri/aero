import React from "react";
import Field from "./Field";
const WorkorderEditor = ({
  brand,
  model,
  colour,
  // status,
  // service,
  onChange,
}) => (
  <ul>
    <li>
      <Field
        name="brand"
        label="Brand"
        value={brand}
        id="brand"
        onChange={onChange}
      />
    </li>
    <li>
      <Field
        name="model"
        label="Model"
        value={model}
        id="model"
        onChange={onChange}
      />
    </li>
    <li>
      <Field
        name="colour"
        label="Colour"
        value={colour}
        id="colour"
        onChange={onChange}
      />
    </li>
    {/* <li>
      <Field
        name="status"
        label="Status"
        value={status}
        id="status"
        onChange={onChange}
      />
    </li>
    <li>
      <Field
        name="service"
        label="Service"
        value={service}
        id="service"
        onChange={onChange}
      />
    </li> */}
  </ul>
);
export default WorkorderEditor;
