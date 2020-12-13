const mongoose = require("mongoose");
// const Services = require('./serviceSchema');
const { Schema } = mongoose;

//___ workorderSchema
// status:        [Ref]
// dateIn:        Date
// dateOut:       Date
// serviceWriter: [Ref]
// brand:         String
// model:         String
// colour:        String
// service:       [Ref]
// parts:         [Ref]
// notes:         embedded document
// invoice:       embedded document
// mechanic:      [Ref]

const workorderSchema = new Schema(
  {
    // dateIn: {
    //   type: String,
    //   default: Date(),
    //   required: true,
    // },
    // dateOut: {
    //   type: String,
    //   default: true,
    // },
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    // service: [Services],

    // status: {
    //   type: [status],
    //   default: true,
    // },
    // parts: [],
  },
  // {
  //   timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  // }
);

module.exports = workorderSchema;

