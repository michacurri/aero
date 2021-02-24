import React from "react";

import { makeStyles } from "@material-ui/core/styles";
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
    flexDirection: "column",
    alignItems: "center",
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
    width: "80%",
    margin: "0 auto",
    padding: "3rem 0",
    rounded: false,
  },
  paperText: {
    rounded: false,
    padding: 1,
  },
  grid__items: {
    width: "100%",
  },
}));

export default function ServicesInputForm(services, updateFields, addRecord) {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <form onSubmit={addRecord} className={classes.root} autoComplete="off">
        <Grid container className={classes.root}>
          <Grid item xs={10} className={classes.grid__items}>
            <Paper className={classes.paperText}>
              <TextField
                id="type"
                name="type"
                label={services.type ? "Service Type" : null}
                value={services.type || ""}
                inputProps={{
                  "aria-label": "Input for service type",
                  maxLength: 50,
                }}
                onChange={updateFields}
                placeholder="Service Type"
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
          <Grid item xs={10} className={classes.grid__items}>
            <Paper className={classes.paperText}>
              <TextField
                id="title"
                name="title"
                label={services.title ? "Title" : null}
                value={services.title || ""}
                inputProps={{
                  "aria-label": "Input for service title",
                  maxLength: 50,
                }}
                onChange={updateFields}
                placeholder="Title"
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
          <Grid item xs={10} className={classes.grid__items}>
            <Paper className={classes.paperText}>
              <TextField
                id="desc"
                name="desc"
                label={services.desc ? "Description" : null}
                value={services.desc || ""}
                inputProps={{
                  "aria-label": "Input for service description",
                  maxLength: 50,
                }}
                onChange={updateFields}
                placeholder="Description"
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
          <Grid item xs={10} className={classes.grid__items}>
            <Paper className={classes.paperText}>
              <TextField
                id="price"
                name="price"
                label={services.price ? "Price" : null}
                value={services.price || ""}
                inputProps={{
                  "aria-label": "Input for service price",
                  maxLength: 50,
                }}
                onChange={updateFields}
                placeholder="Price"
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
        </Grid>
      </form>
    </Paper>
  );
}
