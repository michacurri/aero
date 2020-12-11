import React from "react";

const Field = ({ name, label, value, onChange }) => (
  <ul>
    <li>
      <label htmlFor={`field-${name}`}>{label}</label>
      <input
        id={`field-${name}`}
        name={name}
        type="text"
        value={value}
        onChange={onChange}
      />
    </li>
  </ul>
);

export default Field;
