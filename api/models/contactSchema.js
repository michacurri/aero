const mongoose = require("mongoose");
const { Schema } = mongoose;

//___ contactSchema
// memberId:      Number
// firstName:     String
// lastName:      String
// phone:         Number
// email:         String
// timestamps:    true

const contactSchema = new Schema(
  {
    memberId: {
      type: Number,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = contactSchema;
