const express = require("express");
const app = express();
const path = require("path");
require("dotenv/config");
const uri = process.env.REACT_APP_MONGODB_URI;
const PORT = 5000;
const mongoose = require("mongoose");

app.use(express.json({ extended: false }));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Successfully connected to database server`);
  })
  .catch((err) => {
    console.log({ error: err });
  });

const profiles = require("./api/profileController");
const workorders = require("./api/workorderController");

app.get("/api/profiles", profiles.listProfiles);
app.post("/api/profiles", profiles.createProfile);

// ! //
// TODO
// maybe /PROFILES/WORKORDERS to ensure user is defined
// ////////////////////////////////////////////////////
app.get("/api/workorders", workorders.listWorkorders);
app.post("/api/workorders", workorders.createWorkorder);

// This serves all files placed in the /build
// app.use(express.static("build"));
app.use(express.static("/"));

// Include your own logic here (so it has precedence over the wildcard
// route below)

// This route serves your index.html file (which
// initializes React)
app.get("*", function (req, res, next) {
  // res.sendFile(path.join(__dirname, "build", "index.html"));
  res.sendFile(path.join(__dirname, "index.html"));
});

// Start your server, and listen on port 8080.
app.listen(PORT, function () {
  console.log(`Server is now listening on port ${PORT}!`);
});
