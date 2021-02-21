import React, { useEffect, useState } from "react";
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

export default function Services() {
  const classes = useStyles();
  const [services, setServices] = useState({
    serviceType: null,
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
        setServices(json.data);
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
    if (name === "serviceType") {
      setServices.serviceType(value);
    }
    if (name === "title") {
      setServices.title(value);
    }
    if (name === "desc") {
      setServices.desc(value);
    }
    if (name === "price") {
      setServices.price(value);
    } else;
  };

  const addRecord = async (e) => {
    e.preventDefault();
    const service = {
      serviceType: services.serviceType,
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
      setServices.serviceType("");
      setServices.title("");
      setServices.desc("");
      setServices.price("");
    } catch (err) {
      console.log(err);
    }
  };
  console.log(services.serviceType);
  // let content;
  // if (services) {
  //   content = services;
  // } else
  return (
    <h3>services</h3>
    // <Paper className={classes.paper}>
    //   <form onSubmit={addRecord} className={classes.root} autoComplete="off">
    //     <Grid container className={classes.root}>
    //       <Grid item xs={10} className={classes.grid__items}>
    //         <Paper className={classes.paperText}>
    //           <TextField
    //             id="serviceType"
    //             name="serviceType"
    //             label={services.serviceType ? "Service Type" : null}
    //             value={services.serviceType || ""}
    //             inputProps={{
    //               "aria-label": "Input for service type",
    //               maxLength: 50,
    //             }}
    //             onChange={updateFields}
    //             placeholder="Service Type"
    //             className={classes.textField}
    //             style={{ margin: 8 }}
    //             fullWidth
    //             margin="normal"
    //             InputLabelProps={{
    //               shrink: true,
    //             }}
    //             required
    //             autoFocus
    //           />
    //         </Paper>
    //       </Grid>
    //     </Grid>
    //   </form>
    // </Paper>
  );
  // return content;
}
