const mongoose = require("mongoose");
const { Schema } = mongoose;
const workorderSchema = require("./workorderSchema");
// const contactSchema = require("./contactSchema");

//___ profileSchema
// contact:     contactSchema
// workorder:   workorderSchema

const profileSchema = new Schema(
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
    OAuthUid: Number,
    workorder: [workorderSchema],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("ProfileModel", profileSchema);
