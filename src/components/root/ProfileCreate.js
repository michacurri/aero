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

const headers = { "Content-Type": "application/json" };

function ProfileCreate({ changeLink }) {
  const classes = useStyles();
  const history = useHistory();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const updateFields = (e) => {
    let name = e.target.name;
    console.log(name);
    if (name === "firstName") {
      setFirstName(e.target.value);
    }
    if (name === "lastName") {
      setLastName(e.target.value);
    }
    if (name === "phone") {
      setPhone(e.target.value);
    }
    if (name === "email") {
      setEmail(e.target.value);
    }
    if (name === "password") {
      setPassword(e.target.value);
    } else;
  };

  const addRecord = async (e) => {
    e.preventDefault();
    const contact = { firstName, lastName, phone, email, password };
    try {
      const response = await fetch("/api/profile/create", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(contact),
      });
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
        noValidate
        autoComplete="off"
        autoFocus={true}
      >
        <Grid container className={classes.root}>
          <Grid item xs={10}>
            <Paper className={classes.paperText}>
              <TextField
                className={classes.textField}
                name="firstName"
                id="standard-name"
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
                id="standard-name"
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
              <TextField
                className={classes.textField}
                name="phone"
                id="standard-name"
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
              />
            </Paper>
          </Grid>
          <Grid item xs={10}>
            <Paper className={classes.paperText}>
              <TextField
                className={classes.textField}
                name="email"
                id="standard-name"
                label="Email"
                value={email ?? " "}
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
                id="standard-name"
                label="Password"
                value={password ?? " "}
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
