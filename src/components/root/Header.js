import React, { Fragment, useContext } from "react";
import { UserContext } from "../../backend/authorization/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
// import theme from '../../styles/theme'

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Header({ loginClick, setLoginClick }) {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useContext(UserContext);

  function toggleLoginClick() {
    if (loginClick === false) {
      setLoginClick(true);
    } else {
      setLoginClick(false);
    }
  }

  function logout() {
    setCurrentUser(undefined);
    toggleLoginClick();
  }

  let content;
  if (!currentUser) {
    content = (
      <Fragment>
        <h2>AERO</h2>
        {loginClick ? (
          <Button
            className={classes.root}
            variant="outlined"
            color="secondary"
            onClick={toggleLoginClick}
          >
            Close
          </Button>
        ) : (
          <Button
            className={classes.root}
            variant="outlined"
            color="secondary"
            onClick={toggleLoginClick}
          >
            Login / Signup
          </Button>
        )}
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <h2>AERO</h2>
        <Button variant="outlined" color="secondary" onClick={logout}>
          Logout
        </Button>
      </Fragment>
    );
  }

  return content;
}

export default Header;
