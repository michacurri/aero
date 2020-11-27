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

  // Include your own logic here (so it has precedence over the wildcard route below
  // * EXPRESS ROUTER MINI-APP
  const profiles = require("./api/routes/profileRoutes");
  const workorders = require("./api/routes/workorderRoutes");
  app.get("/", (req, res) => console.log(`something will go here`));
  app.use("/profiles", profiles);
  app.use("/workorders", workorders);
  
  // * the following skips profileRouter.js
  // const profiles = require('./api/controllers/profileController')
  
  // app.get("/", (req, res) => console.log(`something will go here`));
  // app.get('/api/profiles', profiles.listProfiles)
  // app.post('/api/profiles', profiles.createProfile)
  // * ____________________________________
  
  // ? changed original from 'build' to '/'
  // This serves all files placed in the /build
  app.use(express.static("build"));
  // app.use(express.static("/"));

// ? removed 'build' from directory
// This route serves your index.html file (which initializes React)
app.get("*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
  // res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, function () {
  console.log(`Server is now listening on port ${PORT}!`);
});
