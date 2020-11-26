import React from "react";

const Field = ({ name, label, value, onChange }) => (
  <div>
    <label htmlFor={`field-${name}`}>{label}</label>
    <input
      id={`field-${name}`}
      name={name}
      type="text"
      value={value}
      onChange={onChange}
    />
  </div>
);

export default Field;
