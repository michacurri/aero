import React, { Fragment, useContext } from "react";
import { UserContext } from "../../backend/authorization/UserContext";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { ImpersonatorContext } from "../../backend/authorization/ImpersonatorContext";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  Header: {
    width: "100vw",
    backgroundColor: "#212529",
  },
  header__container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 auto",
    height: "15vh",
    maxWidth: "1200px",
    padding: "2rem",
  },
}));

function Header({ loginClick, setLoginClick }) {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [admin, setAdmin] = useContext(ImpersonatorContext);

  function toggleLoginClick() {
    if (loginClick === false) {
      setLoginClick(true);
    } else {
      setLoginClick(false);
    }
  }

  function logout() {
    setCurrentUser(undefined);
    setAdmin(undefined);
    toggleLoginClick();
  }

  let content;
  if (!currentUser && !admin) {
    content = (
      <header className={classes.Header}>
        <div className={classes.header__container}>
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
        </div>
      </header>
    );
  } else {
    content = (
      <header className={classes.Header}>
        <div className={classes.header__container}>
          <h2>AERO</h2>
          <Button
            className={classes.root}
            variant="outlined"
            color="secondary"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </header>
    );
  }

  return content;
}

export default Header;
