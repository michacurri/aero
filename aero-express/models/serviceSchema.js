const mongoose = require("mongoose");
const { Schema } = mongoose;

//___ servicesSchema
// serviceType:         String
// title:               String
// description:         [String]
// price:               Number

const serviceSchema = new Schema({
  serviceType: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Services", serviceSchema);
