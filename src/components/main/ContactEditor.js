import React from "react";
import Field from "./Field";
const ContactEditor = ({ contact, onChange }) => (
  <div>
    <Field
      name="firstName"
      label="First Name"
      value={contact.firstName}
      onChange={onChange}
    />
    <Field
      name="lastName"
      label="Last Name"
      value={contact.lastName}
      onChange={onChange}
    />
    <Field
      name="phone"
      label="Phone Number"
      value={contact.phone}
      onChange={onChange}
    />
    <Field
      name="email"
      label="Email"
      value={contact.email}
      onChange={onChange}
    />
  </div>
);
export default ContactEditor;
