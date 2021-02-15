import React, { Fragment, useState } from "react";
import WorkorderDisplay from "./WorkorderDisplay";
import WorkorderCreate from "../admin/WorkorderCreate";
import { makeStyles } from "@material-ui/core/styles";
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
  button: {
    backgroundColor: "#558564",
    color: "#E0E0E0",
    padding: "2rem",
  },
}));

const Workorder = ({ admin, currentProfile, loadUserProfile }) => {
  const classes = useStyles();
  const [workView, setWorkView] = useState("display");

  function workorderClick() {
    if (workView === "display") {
      setWorkView("create");
    } else {
      setWorkView("display");
    }
  }

  let content;
  if (admin) {
    content = (
      <Fragment>
        {workView === "display" ? (
          <Fragment>
            <Button className={classes.button} onClick={workorderClick}>
              Create new Workorder
            </Button>
            <WorkorderDisplay currentProfile={currentProfile} />
          </Fragment>
        ) : (
          <Fragment>
            <Button className={classes.button} onClick={workorderClick}>
              View Workorders
            </Button>
            <WorkorderCreate
              currentProfile={currentProfile}
              loadUserProfile={loadUserProfile}
              />
              <h5>Admin Search options</h5>
              {/* below here only because admin has not been fully set up */}
          </Fragment>
        )}
      </Fragment>
    );
  } else {
    content = (
      <Fragment>
        <WorkorderDisplay currentProfile={currentProfile} />
      </Fragment>
    );
  }
  return content;
};

export default Workorder;
