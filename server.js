const express = require("express");
const app = express();
const path = require("path");
require("dotenv/config");
// const uri = process.env.MONGODB_URI;
const uri = "mongodb://localhost:27017/aero"
const PORT = 5000;
const mongoose = require("mongoose");

app.use(express.json({ extended: false }));

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Successfully connected to database server ${uri}`);
  })
  .catch((err) => {
    console.log({ error: err });
  });

  // * EXPRESS ROUTER MINI-APP
  const profile = require("./api/routes/profileRoutes");
  const workorder = require("./api/routes/workorderRoutes");
  app.use("/profile", profile);
  app.use("/workorder", workorder);
  
  // ? changed original from 'build' to '/'
  // This serves all files placed in the /build
  // app.use(express.static("build"));
  app.use(express.static("/"));

// ? removed 'build' from directory
// This route serves your index.html file (which initializes React)
app.get("*", function (req, res, next) {
  // res.sendFile(path.join(__dirname, "build", "index.html"));
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, function () {
  console.log(`Server is now listening on port ${PORT}!`);
});
