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






// import React, { Fragment } from "react";
// import TextField from "@material-ui/core/TextField";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     "& > *": {
//       margin: theme.spacing(1),
//     },
//     "& .MuiTextField-root": {
//       margin: theme.spacing(1),
//       width: "25ch",
//     },
//   },
// }));

// const ContactEditor = ({
//   firstName,
//   lastName,
//   phone,
//   email,
//   password,
//   onChange,
// }) => {
//   const classes = useStyles();
//   return (
//     <Fragment>
//       <TextField
//         name="firstName"
//         id="standard-name"
//         label="First Name"
//         value={firstName ?? " "}
//         onChange={onChange}
//       />
//       <TextField
//         name="lastName"
//         id="standard-name"
//         label="Last Name"
//         value={lastName ?? " "}
//         onChange={onChange}
//       />
//       <TextField
//         name="phone"
//         id="standard-name"
//         label="Phone"
//         value={phone ?? " "}
//         onChange={onChange}
//       />
//       <TextField
//         name="email"
//         id="standard-name"
//         label="Email"
//         value={email ?? " "}
//         onChange={onChange}
//       />
//       <TextField
//         name="password"
//         id="standard-name"
//         label="Password"
//         value={password ?? " "}
//         onChange={onChange}
//       />
//     </Fragment>
//   );
// };
// export default ContactEditor;
