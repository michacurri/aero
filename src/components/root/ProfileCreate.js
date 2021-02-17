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
    width: "75%",
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
    phoneErr: false,
    phoneErrHelper: "",
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
    }
    if (name === "password") {
      setPassword(value);
      if (!passRegex.test(value)) {
        setErrors({
          passErr: true,
          passErrHelper:
            "must contain 1 special character; 1 number; and 1 capitalized letter",
        });
      } else {
        setErrors({
          passErr: false,
        });
      }
    } else;
  };

  const onBlurValidate = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "phone") {
      if (!phoneRegex.test(value)) {
        console.log(value);
        setErrors({
          phoneErr: true,
          phoneErrHelper: "please enter a valid phone number",
        });
      } else {
        console.log("phone: passed");
        setErrors({
          phoneErr: false,
        });
      }
    } else if (name === "email") {
      setErrors({ emailErr: false });
      if (!emailRegex.test(value)) {
        setErrors({
          emailErr: true,
          emailErrHelper: "please enter a valid email",
        });
      } else {
        setErrors({ emailErr: false });
      }
    }
  };

  // prettier-ignore
  const passRegex = new RegExp(
    // eslint-disable-next-line
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  // prettier-ignore
  const emailRegex = new RegExp(
    // eslint-disable-next-line
    `(\w[-._\w]*\w@\w[-._\w]*\w\.\w{2,3})`
  );
  // prettier-ignore
  const phoneRegex = new RegExp(
    // eslint-disable-next-line
    "^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$"
    // "^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?))[2-9]\d{2}[- ]?\d{4}$"
  );

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
                id="firstName"
                name="firstName"
                label={firstName ? "First Name" : null}
                value={firstName || ""}
                inputProps={{
                  "aria-label": "Input for first name",
                  maxLength: 50,
                }}
                onChange={updateFields}
                placeholder="First Name"
                className={classes.textField}
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
                id="lastName"
                name="lastName"
                label={lastName ? "Last Name" : null}
                value={lastName || ""}
                inputProps={{
                  "aria-label": "Input for last name",
                  maxLength: 50,
                }}
                onChange={updateFields}
                placeholder="Last Name"
                className={classes.textField}
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
                id="phone"
                name="phone"
                label={phone ? "Phone Number" : null}
                value={phone || ""}
                onChange={updateFields}
                placeholder="Telephone Number"
                className={classes.textField}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                inputProps={{
                  "aria-label": "Input for phone number",
                  maxLength: 10,
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                pattern={phoneRegex}
                error={errors?.phoneErr}
                helperText={errors?.phoneErrHelper}
                onBlur={onBlurValidate}
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paperText}>
              <TextField
                type="email"
                id="email"
                name="email"
                label={email ? "Email Address" : null}
                value={email || ""}
                onChange={updateFields}
                placeholder="Email Address"
                className={classes.textField}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                inputProps={{ "aria-label": "Input for email address" }}
                InputLabelProps={{
                  shrink: true,
                }}
                required
                pattern={emailRegex}
                error={errors?.emailErr}
                helperText={errors?.emailErrHelper}
                onBlur={onBlurValidate}
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paperText}>
              <TextField
                id="password"
                type="password"
                placeholder="Password"
                className={classes.textField}
                name="password"
                label={password ? "Password" : null}
                value={password || ""}
                inputProps={{
                  "aria-label":
                    "Input for password. Password must contain one special character; one number; and one capitalized letter",
                  minLength: 8,
                }}
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
          {!errors.phoneErr && !errors.emailErr && !errors.passErr ? (
            <Button
              className={classes.submit}
              variant="outlined"
              color="primary"
              type="submit"
              value="Save"
            >
              Submit
            </Button>
          ) : null}
        </Grid>
      </form>
    </Paper>
  );
}

export default ProfileCreate;
