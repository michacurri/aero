import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
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

const ProfileSearch = (setCurrentProfile) => {
  const classes = useStyles();
  const [inputValue, setInputValue] = useState(null);

  const updateSearchField = (e) => {
    // const searchQuery = { ...value };
    // searchQuery[e.target.name] = e.target.value;
    // console.log(searchQuery);
    // setValue(searchQuery);
    const {
      target: {value},
    } = e;
    setInputValue(value)
    console.log(value)
  };
  
  // TODO setTimeout() delay fn after (n)seconds from last keystroke
  const searchProfiles = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/profile/search/${inputValue}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log(response.data)
        // setCurrentProfile(response.data);
      } else {
        console.log("Error when saving record");
      }
    } catch (e) {
      console.log(e);
    }
  };

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
                  placeholder="search by workorder #, phone, email, or name"
                ></Input>
              </Paper>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Fragment>
  );

  // const searchByMemberId = () => setSearchBy("memberId");
  // const SearchByPhone = () => setSearchBy("phone");
  // const searchByEmail = () => setSearchBy("email");

  //   return (
  //     <Fragment>
  //       <h3>Search By:</h3>
  //       <button onClick={searchByMemberId}>Member ID</button>
  //       <button onClick={SearchByPhone}>Phone Number</button>
  //       <button onClick={searchByEmail}>Email Address</button>
  //       <div className="profile__searchBox">
  //         <form onSubmit={searchProfiles}>
  //           <ContactEditor searchBy={searchBy} onChange={updateSearchField} />
  //           <input type="submit" value="Search" />
  //         </form>
  //       </div>
  //     </Fragment>
  //   );
};

export default ProfileSearch;
