const mongoose = require("mongoose");
const { Schema } = mongoose;

//___ servicesSchema
// service:        String

const serviceSchema = new Schema({
  services: String,
});

module.exports = serviceSchema;
