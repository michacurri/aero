const mongoose = require("mongoose");
const { Schema } = mongoose;

// TODO
// profileSchema
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
});

const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;

//!     ONE LINER     
//     module.exports = mongoose.model('Profile', profileSchema);