import React, { useEffect, useState, Fragment } from "react";
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
  paperDispServices: {
    display: "flex",
    width: "30%",
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

export default function Services() {
  const classes = useStyles();
  const [services, setServices] = useState({
    type: null,
    title: null,
    desc: null,
    price: null,
  });

  const loadServices = async function () {
    try {
      const response = await fetch("/api/services", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message);
      } else {
        if (json.data) {
          setServices(json.data);
        } else {
          console.log("no services are available");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const updateFields = (e) => {
    const {
      target: { name, value },
    } = e;
    if (name === "type") {
      setServices({ ...services, type: value });
    }
    if (name === "title") {
      setServices({ ...services, title: value });
    }
    if (name === "desc") {
      setServices({ ...services, desc: value });
    }
    if (name === "price") {
      setServices({ ...services, price: value });
    } else;
  };

  const addRecord = async (e) => {
    e.preventDefault();
    const service = {
      type: services.type,
      title: services.title,
      desc: services.desc,
      price: services.price,
    };
    console.log(service);
    try {
      const response = await fetch("/api/services/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      console.log(response);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setServices.type("");
      setServices.title("");
      setServices.desc("");
      setServices.price("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Fragment>
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
      {services.type ? (
        <Fragment>
          <Paper className={classes.paperDispServices}>
            <Grid xs={4} container className={classes.root}>
              <Grid
                item
                xs={4}
                className={classes.grid__items}
                key={Object.keys(services)}
              >
                <Paper className={classes.paperText}>
                  {Object.values(services)}
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Fragment>
      ) : (
        <h1>NO SERVICES</h1>
      )}
    </Fragment>
  );
}
