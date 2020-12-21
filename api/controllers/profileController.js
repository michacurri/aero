const Profile = require("../models/profileModel");

//    createProfile
//    findProfileByEmail
//    findProfileById

module.exports = {
  createProfile: async ({
    firstName,
    lastName,
    email,
    phone,
    password,
    workorders,
  }) => {
    const newProfile = new Profile({
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
      const profileRes = await Profile.findOne({ email });
      return profileRes;
    } catch (err) {
      throw err;
    }
  },
  findProfileById: async (id) => {
    try {
      const profile = await Profile.findById(id);
      //* return everything but password
      return {
        id: profile._id,
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: profile.email,
        workorders: profile.workorders,
      };
    } catch (err) {
      throw err;
    }
  },
};
