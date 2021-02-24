import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  advertHero__container: {
    height: "100%",
    width: "100vw",
    padding: "3rem",
    backgroundImage:
      "url(https://triathlonmagazine.ca/wp-content/uploads/2020/04/VentumZ_105_ENVE_Editorial_H-scaled.jpg;)",
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    backgroundRepeat: "no-repeat",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
}));

function AdvertHero() {
  const classes = useStyles();
  return (
    <div
      className={classes.advertHero__container}
      alt="Aero Workorder Management will greatly improve efficiencies"
      title="Image Copyright: Ventum LLC, 2020 - Creator: Nils Nilsen - https://triathlonmagazine.ca/wp-content/uploads/2020/04/VentumZ_105_ENVE_Editorial_H-scaled.jpg"
    >
      <h1>AERO</h1>
      <h3>Work Order Management Tools</h3>
    </div>
  );
}

export default AdvertHero;
