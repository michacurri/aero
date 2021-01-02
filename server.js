const express = require("express");
const app = express();
const path = require("path");
require("dotenv/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/aero";
// const DB_URI = "mongodb://localhost:27017/aero";
const PORT = process.env.PORT || 5000;
// const PORT = 5000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
    exposedHeaders: ["Set-Cookie"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// * EXPRESS ROUTER MINI-APP
const profile = require("./api/routes/profileRoutes");
const workorder = require("./api/routes/workorderRoutes");
app.use("/api/profile", profile);
app.use("/api/workorder", workorder);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('./build'));
  // only add this part if you are using React Router
  app.get('/*', (req,res) =>{
      console.log(path.join(__dirname+'/build/index.html'));
      res.sendFile(path.join(__dirname+'/build/index.html'));
  });
}

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`Successfully connected to database server ${DB_URI}`);
  })
  .catch((err) => {
    console.log({ error: err });
  });

app.use(express.static("/"));

app.listen(PORT, function () {
  console.log(`Server is now listening on port ${PORT}!`);
});
