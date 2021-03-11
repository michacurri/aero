const express = require("express");
const path = require("path");
require("dotenv/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/aero";
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      "http://localhost:3000/" ||
      "https://aero-workorder-management.herokuapp.com",
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// * EXPRESS ROUTER MINI-APP
const profile = require("./routes/profileRoutes");
const workorder = require("./routes/workorderRoutes");
const services = require("./routes/serviceRoutes");
app.use("/api/profile", profile);
app.use("/api/workorder", workorder);
app.use("/api/services", services);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("./build"));
  // only add this part if you are using React Router
  app.get("/*", (req, res) => {
    console.log(path.join(__dirname + "/build/index.html"));
    res.sendFile(path.join(__dirname + "/build/index.html"));
  });
}

app.use(express.static("/"));

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server is now listening on port ${PORT}!`);
    });
    console.log(`Successfully connected to database server ${DB_URI}`);
  })
  .catch((err) => {
    console.log({ error: err });
  });
