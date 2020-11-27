const mongoose = require("mongoose");
const { Schema } = mongoose;
const workorderSchema = require("./workorderSchema");
const contactSchema = require('./contactSchema')

//___ profileSchema
// memberId:  Number //   required
// firstName: String //   required
// lastName:  String //   required
// phone:     Number //   required
// email:     String //   required

const profileSchema = new Schema({
  memberId: {
    type: Number,
    required: true,
  },
  contact: contactSchema,
  workorder: workorderSchema,
});

module.exports = mongoose.model("ProfileModel", profileSchema);
