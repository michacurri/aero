import React from "react";
import Field from "./Field";
const SearchEditor = ({ searchBy, value, onChange }) => (
  <ul>
    <li>
      <Field
        name={searchBy}
        label={searchBy}
        value={value}
        onChange={onChange}
      />
    </li>
  </ul>
);
export default SearchEditor;
