import React from "react";
import Field from "./Field";
const ContactEditor = ({
  memberId,
  firstName,
  lastName,
  phone,
  email,
  onChange,
}) => (
  <ul>
    <li>
      <Field
        name="memberId"
        label="Member ID"
        value={memberId}
        onChange={onChange}
      />
    </li>
    <li>
      <Field
        name="firstName"
        label="First Name"
        value={firstName}
        onChange={onChange}
      />
    </li>
    <li>
      <Field
        name="lastName"
        label="Last Name"
        value={lastName}
        onChange={onChange}
      />
    </li>
    <li>
      <Field
        name="phone"
        label="Phone Number"
        value={phone}
        onChange={onChange}
      />
    </li>
    <li>
      <Field name="email" label="Email" value={email} onChange={onChange} />
    </li>
  </ul>
);
export default ContactEditor;
