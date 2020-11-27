const mongoose = require("mongoose");
const contactSchema = require("./contactSchema");
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

const mechanicSchema = new Schema(
  {
    employeeId: {
      type: Number,
      default: true,
    },
    contact: contactSchema,
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mechanicSchema;
