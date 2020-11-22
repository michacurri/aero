const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const uri = process.env.REACT_APP_MONGODB_URI;
const PORT = 5000;

// Express body parser middlware
app.use(express.json({ extended: false }));

// connect to database
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Successfully connected to database server`);
  })
  .catch((err) => {
    console.log(err.message);
  });

// TODO
// Define Routes
app.use("/profiles", require("./routes/profiles"));
app.use("/workorders", require("./routes/workorders"));

// Start Server
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
