const Profile = require("../models/profileModel");

//    createProfile
//    findProfileByEmail
//    findProfileById

module.exports = {
  createProfile: async ({
    admin,
    firstName,
    lastName,
    email,
    phone,
    password,
    workorders,
  }) => {
    const newProfile = new Profile({
      admin,
      firstName,
      lastName,
      phone,
      email,
      password,
      workorders,
    });
    const profile = await newProfile.save();
    return profile;
  },
  findProfileByEmail: async (email) => {
    try {
      const profileRes = await Profile.findOne({ email })
        .populate("workorders")
        .exec();
      return profileRes;
    } catch (err) {
      throw err;
    }
  },
  findProfileById: async (id) => {
    try {
      const profile = await Profile.findById(id).populate("workorders").exec();
      //* return everything but password
      return {
        id: profile._id,
        admin: profile.admin,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        workorders: profile.workorders,
      };
    } catch (err) {
      throw err;
    }
  },
  findProfileByAny: async (inputValue) => {
    try {
      const profileRes = await Profile.find({
        $or: [
          { firstName: inputValue },
          { lastName: inputValue },
          { email: inputValue },
          // TODO - mongoose.js CastError: Cast to number failed for value
          // { phone: inputValue },
        ],
      })
        .populate("workorders")
        .exec();
      return profileRes;
    } catch (err) {
      throw err;
    }
  },
};
