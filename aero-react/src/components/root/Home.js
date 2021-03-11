import React, { useContext } from "react";
import { UserContext } from "../../backend/authorization/UserContext";
import { ImpersonatorContext } from "../../backend/authorization/ImpersonatorContext";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardActionArea, CardContent } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  home__container: {
    display: "flex",
  },
  paper: {
    display: "flex",
    width: "25%",
    margin: "1rem auto",
    padding: 1,
    rounded: false,
  },
  paperText: {
    rounded: false,
    padding: 1,
  },
}));

function Home() {
  const classes = useStyles();
  const [admin] = useContext(ImpersonatorContext);
  const [currentProfile] = useContext(UserContext);

  let content;

  // if (!admin && currentProfile) {
  content = (
    <div className={classes.home__container}>
      {/* <Paper className={classes.paper}> */}
      <Grid container>
        <Grid item xs={4}>
          {/* <Paper className={classes.paper}> */}
          <Card className={classes.card}>
            <CardActionArea onClick={() => console.log("Basic")}>
              <CardContent>
                <Typography className={classes.title}>Tune-up</Typography>
                <Typography variant="h5" component="h2">
                  BASIC
                </Typography>
                <Typography variant="body2" component="p">
                  End-to-End checkup
                  <br />
                  Components cleaned and adjusted
                  <br />
                  Minor wheel true
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card className={classes.card}>
            <CardActionArea onClick={() => console.log("Advanced")}>
              <CardContent>
                <Typography className={classes.title}>Tune-up</Typography>
                <Typography variant="h5" component="h2">
                  ADVANCED
                </Typography>
                <Typography variant="body2" component="p">
                  Basic plus:
                  <br />
                  All Bearings repacked
                  <br />
                  Components removed, inspected, and cleaned
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
  // }
  return content;
}

export default Home;
