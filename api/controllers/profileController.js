const Profile = require("../models/profileModel");

//    findProfileByEmail
//    findProfileByPhone
//    findProfileByMemberId
//    createProfile
//    profile_delete

module.exports = {
  listProfiles: async (req, res) => {
    const profiles = await Profile.find();
    res.json(profiles);
  },
  findProfileByEmail: async (req, res) => {
    const reqEmail = req.params.email;
    try {
      console.log(reqEmail);
      const profileRes = await Profile.find({email: reqEmail});
      res.json(profileRes);
    } catch(err) {
      console.log(err);
    }
  },
  findProfileByPhone: async (req, res) => {
    const reqPhone = req.params.phone;
    try {
      console.log(reqPhone);
      const profileRes = await Profile.find({phone: reqPhone});
      res.json(profileRes);
    } catch(err) {
      console.log(err);
    }
  },
  findProfileByMemberId: async (req, res) => {
    const reqMemberId = req.params.memberId;
    try {
      console.log(reqMemberId);
      const profileRes = await Profile.find({memberId: reqMemberId});
      res.json(profileRes);
    } catch(err) {
      console.log(err);
    }
  },
    createProfile: async (req, res) => {
      const { memberId, firstName, lastName, phone, email } = req.body;
      const newProfile = new Profile({
        memberId,
        firstName,
        lastName,
        phone,
        email,
      });
      console.log(newProfile);
      const profile = await newProfile.save();
      res.json(profile);

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

