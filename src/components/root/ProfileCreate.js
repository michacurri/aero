// import ContactEditor from "./ContactEditor";
// import { sizing } from "@material-ui/system";
import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import InputMask from "react-input-mask";


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
  const [prePass, setPrePass] = useState();
  const phoneRef = useRef(null);
  
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const emailRegex = new RegExp(
      "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$/"
      );
      
      const checkPasswordStrength = () => {
        if (!strongRegex.test(prePass)) {
      console.log(
        "password must be greater than 8 characters; contain 1 number; 1 uppercase letter; and 1 special character"
        );
      } else {
      setPassword(prePass);
    }
  };

  const updateFields = (e) => {
    let name = e.target.name;
    if (name === "firstName") {
      setFirstName(e.target.value);
      console.log(firstName);
    }
    if (name === "lastName") {
      setLastName(e.target.value);
      console.log(lastName);
    }
    if (name === "phone") {
      setPhone(e.target.value);
      console.log(phone);
    }
    if (name === "email") {
      setEmail(e.target.value);
      console.log(email);
    }
    if (name === "password") {
      setPrePass(e.target.value);
      checkPasswordStrength();
      //* ^^ working, but it needs to display
      //* on the form - how to do this?
      // setPassword(e.target.value);
    } else;
  };

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
      console.log(response)
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
      <form
        onSubmit={addRecord}
        className={classes.root}
        // noValidate
        autoComplete="off"
        autoFocus={true}
      >
        <Grid container className={classes.root}>
          <Grid item xs={10}>
            <Paper className={classes.paperText}>
              <TextField
                className={classes.textField}
                name="firstName"
                // id="standard-name"
                label="First Name"
                value={firstName ?? " "}
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
                className={classes.textField}
                name="lastName"
                // id="standard-name"
                label="Last Name"
                value={lastName ?? " "}
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
              <InputMask
                mask="999-999-9999"
                disabled={false}
                maskChar=" "
                value={phone ?? " "}
                onChange={updateFields}
              >
                {() => (
                  <TextField
                    className={classes.textField}
                    name="phone"
                    // id="standard-name"
                    label="Phone"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    required
                    ref={phoneRef}
                  />
                )}
              </InputMask>
              {/* <TextField
                className={classes.textField}
                name="phone"
                // id="standard-name"
                label="Phone"
                value={phone ?? " "}
                onChange={updateFields}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              /> */}
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paperText}>
              <TextField
                className={classes.textField}
                name="email"
                type="email"
                // id="standard-name"
                label="Email"
                value={email ?? " "}
                pattern={emailRegex}
                onChange={updateFields}
                style={{ margin: 8 }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
                // error
                // helperText="must be an email"
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paperText}>
              <TextField
                className={classes.textField}
                name="password"
                // id="standard-name"
                label="Password"
                value={prePass ?? " "}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})"
                // pattern={strongRegex}
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
