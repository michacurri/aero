const Profile = require("../models/profileModel");

//    findProfileByEmail
//    findProfileByPhone
//    findProfileByMemberId
//    createProfile
//    profileDelete

module.exports = {
  listProfiles: async (req, res) => {
    const profiles = await Profile.find();
    res.json(profiles);
  },
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
      // console.log(err);
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
      };
    } catch (err) {
      throw err;
    }
  },
  findProfileByPhone: async (req, res) => {
    const reqPhone = req.params.phone;
    try {
      const profileRes = await Profile.find({ phone: reqPhone });
      res.json(profileRes);
    } catch (err) {
      console.log(err);
    }
  },
  // TODO FINISH THE FOLLOWING REQUEST
  // profile_details: async (req, res) => {
  //   const { profileId } = req.params;
  //   const { memberId, firstName, lastName, phone, email } = req.body;
  //   const profile = await Profile.findById(profileId);
  // },

  // profile_delete = async (req, res) => {
  //   const profileId = req.params.id;
  //   const deleteProfile = await Profile.findByIdAndDelete(profileId);
  //   res.json(deleteProfile);
  // },
};
