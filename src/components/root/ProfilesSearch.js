import React, { useState, Fragment, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import Button from "@material-ui/core/Button";

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
  Input: {
    marginLEft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "75%",
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    display: "flex",
    width: "90%",
    margin: "0 auto",
    padding: 1,
    rounded: false,
  },
  paperText: {
    rounded: false,
    padding: 1,
  },
}));

const ProfileSearch = (props) => {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [toggleCreate, setToggleCreate] = useState(false);

  const updateSearchField = (e) => {
    const {
      target: { value },
    } = e;
    setSearchValue(value);
    console.log(value);
  };

  // TODO setTimeout() delay fn after (n)seconds from last keystroke
  const searchProfiles = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/profile/search/${searchValue}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.log("Search returned no results");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setToggleCreate(false);
  }, []);

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <form
          onSubmit={searchProfiles}
          className={classes.root}
          autoComplete="off"
        >
          <Grid container className={classes.root}>
            <Grid item xs={10}>
              <Paper className={classes.paperText}>
                <Input
                  onChange={updateSearchField}
                  placeholder="search by email, first, or last name"
                ></Input>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {searchResults
        ? searchResults.map((searchResult) => {
            const {
              _id,
              firstName,
              lastName,
              email,
              phone,
              workorders,
            } = searchResult;
            const userProfile = {
              _id,
              firstName,
              lastName,
              email,
              phone,
              workorders,
            };
            return (
              <Grid key={_id} container className={classes.root}>
                <Grid item xs={10}>
                  <Paper className={classes.paperText}>
                    <List>
                      <ListItem>
                        <ListItemText
                          primary={`${firstName} ${lastName}`}
                          secondary={`${email}`}
                        />
                        <ListItemSecondaryAction>
                          <IconButton
                            edge="end"
                            aria-label="check icon"
                            onClick={() => props.setCurrentProfile(userProfile)}
                          >
                            <CheckSharpIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                  </Paper>
                </Grid>
              </Grid>
            );
          })
        : null}
      {toggleCreate && (
        <Button
          className={classes.submit}
          variant="outlined"
          color="primary"
          type="submit"
          value="Save"
          //TODO onClick={} to create new Profile
          //TODO maybe create <Route path="/profile" render={() =>
        >Create New Profile</Button>
      )}
    </Fragment>
  );
};

export default ProfileSearch;
