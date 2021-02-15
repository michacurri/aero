import React, { Fragment, useState } from "react";
import { Link, Switch, Route, Redirect } from "react-router-dom";
import ProfileCreate from "../../components/root/ProfileCreate";
// import Field from "../../components/root/Field";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
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
    // width: "50%",
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    // width: "50%",
    margin: "0 auto",
    padding: 1,
    rounded: false,
  },
  paperText: {
    rounded: false,
    padding: 1,
  },
  grid: {
    maxWidth: "calc(50% - 16px)",
    flexGrow: "50%",
    flexBasis: "200px",
  },
}));

const AuthContainer = ({ loadUserProfile }) => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [link, setLink] = useState("signup");

  const changeLink = () => {
    if (link === "signup") {
      setLink("login");
    } else {
      setLink("signup");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      loadUserProfile();
    } catch (err) {
      setError(err.message);
      console.log(error);
    }
  };

  return (
    <Fragment>
      <Redirect to="/login" />
      <Switch>
        <Route path="/login">
          <form
            onSubmit={handleSubmit}
            className={classes.root}
            autoComplete="off"
            autoFocus={true}
            noValidate
          >
            <Grid container className={classes.root}>
              <Grid item className={classes.grid}>
                <Paper className={classes.paperText}>
                  <TextField
                    autoFocus
                    type="email"
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Paper>
              </Grid>
              <Grid className={classes.grid}>
                <Paper className={classes.paperText}>
                  <TextField
                    type="password"
                    name="password"
                    label="Password"
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
            <Button variant="outlined" color="primary" type="submit">
              Login
            </Button>
          </form>
        </Route>
        <Route path="/signup">
          <ProfileCreate changeLink={changeLink} />
        </Route>
      </Switch>
      {/* prettier-ignore */}
      <nav>
        {/* <ul>
          <li><Link to={`${link}`} onClick={changeLink}>{`${link}`}</Link></li>
        </ul> */}
        <Button component={Link} to={`${link}`} onClick={changeLink} variant="outlined" color="primary" >{`${link}`}</Button>
      </nav>
    </Fragment>
  );
};

export default AuthContainer;
