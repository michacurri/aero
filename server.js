const express = require("express");
const app = express();
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/aero-data";
const PORT = 5000;

// connect to database
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log(`Successfully connected to: ${uri}`);
  })
  .catch((err) => {
    console.log(err.message);
  });

// Express body parser middlware
app.use(express.json({ extended: false }));

// TODO
// Define Routes
app.use("/profiles", require("./routes/profiles"));
app.use("/workorders", require("./routes/workorders"));

// Start Server
app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});
