import React from "react";
import Field from "./Field";
const ContactEditor = ({
  firstName,
  lastName,
  phone,
  email,
  password,
  onChange,
}) => (
  <ul>
    <li>
      <Field
        name="firstName"
        label="First Name"
        value={firstName}
        id="firstName"
        onChange={onChange}
      />
    </li>
    <li>
      <Field
        name="lastName"
        label="Last Name"
        value={lastName}
        id="lastName"
        onChange={onChange}
      />
    </li>
    <li>
      <Field
        name="phone"
        label="Phone Number"
        value={phone}
        id="phone"
        onChange={onChange}
        />
    </li>
    <li>
      <Field 
        name="email" 
        label="Email" 
        value={email} 
        id="email"        
        onChange={onChange} 
        />
    </li>
    <li>
      <Field
        name="password"
        label="Password"
        value={password}
        id="password"        
        onChange={onChange}
      />
    </li>
  </ul>
);
export default ContactEditor;
