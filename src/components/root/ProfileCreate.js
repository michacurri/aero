// import ContactEditor from "./ContactEditor";
// import { sizing } from "@material-ui/system";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexGrow: 1,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  textField: {
    marginLEft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "75%",
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    width: "50%",
    margin: "0 auto",
    padding: 1,
    rounded: false,
  },
  paperText: {
    rounded: false,
    padding: 1,
  },
}));

function ProfileCreate({ changeLink }) {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({
    emailErr: false,
    emailErrHelper: "",
    passErr: false,
    passErrHelper: "",
  });

  const updateFields = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "firstName") {
      setFirstName(value);
    }
    if (name === "lastName") {
      setLastName(value);
    }
    if (name === "phone") {
      setPhone(value);
    }
    if (name === "email") {
      setEmail(value);
      setErrors({ emailErr: false });
      if (!emailRegex.test(value)) {
        setErrors({
          emailErr: true,
          emailErrHelper: "please enter a valid email",
        });
      }
    }
    if (name === "password") {
      setPassword(value);
      setErrors({ passErr: false });
      if (!passRegex.test(value)) {
        setErrors({
          passErr: true,
          passErrHelper:
            "must contain 1 special character; 1 number; and 1 capitalized letter",
        });
      }
    } else;
  };

  //?   REGEX STRINGS
  const passRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  const emailRegex = new RegExp(
    // eslint-disable-next-line
    `(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})`
  );
  const phoneRegex = new RegExp(
    "^([0-9]{2})?(([0-9]{2}))([0-9]{3}|[0-9]{4})-[0-9]{4}$"
  );
  //? ///////////////

  const addRecord = async (e) => {
    e.preventDefault();
    const contact = { firstName, lastName, phone, email, password };
    console.log(contact);
    try {
      const response = await fetch("/api/profile/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      console.log(response);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setPassword("");
      redirectOnSubmit();
    } catch (err) {
      console.log(err);
    }
  };

  const redirectOnSubmit = () => {
    history.push("/login");
    changeLink();
  };

  return (
    <Paper className={classes.paper}>
      <form onSubmit={addRecord} className={classes.root} autoComplete="off">
        <Grid container className={classes.root}>
          <Grid item xs={10}>
            <Paper className={classes.paperText}>
              <TextField
                type="text"
                className={classes.textField}
                name="firstName"
                id="standard-name"
                label="First Name"
                value={firstName || ""}
                onChange={updateFields}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                autoFocus
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paperText}>
              <TextField
                type="text"
                className={classes.textField}
                name="lastName"
                id="standard-name"
                label="Last Name"
                value={lastName || ""}
                onChange={updateFields}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paperText}>
              <TextField
                type="tel"
                value={phone || ""}
                pattern={phoneRegex}
                onChange={updateFields}
                className={classes.textField}
                name="phone"
                id="standard-required"
                label="Phone"
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paperText}>
              <TextField
                type="email"
                className={classes.textField}
                name="email"
                id="standard-name"
                label="Email"
                value={email || ""}
                pattern={emailRegex}
                onChange={updateFields}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                error={errors?.emailErr}
                helperText={errors?.emailErrHelper}
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paperText}>
              <TextField
                type="password"
                id="standard-password-input"
                className={classes.textField}
                name="password"
                label="Password"
                value={password || ""}
                pattern={passRegex}
                onChange={updateFields}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                error={errors?.passErr}
                helperText={errors?.passErrHelper}
              />
            </Paper>
          </Grid>
          <Button
            className={classes.submit}
            variant="outlined"
            color="primary"
            type="submit"
            value="Save"
          >
            Submit
          </Button>
        </Grid>
      </form>
    </Paper>
  );
}

export default ProfileCreate;
