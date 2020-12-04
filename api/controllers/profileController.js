const Profile = require("../models/profileModel");

//    profile_create_get
//    profiles_index
//    profile_create
// TODO //    profile_details
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
  // createProfile: (req, res) => {
  //   const profile = new Profile(req.body);
  //   profile
  //     .save()
  //     .then(() => res.sendStatus(200))
  //     .catch((err) => {
  //       console.log(err);
  //       res.sendStatus(500);
  //     });

    //! ______________________ALTERNATIVE TO ABOVE
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
    //! __________________________________________
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

//! ORIGINAL WORKORDERID SEARCH
//! to combine profile and workorder together
// router.post("/:workorderId", async (req, res) => {
//   const { workorderId } = req.params;
//   const { workorderNum } = req.body;
//   // Find workorder based on the workorderId
//   const workorder = await Workorder.findById(workorderId);
//   // Find profile based on workorderNum
//   const profile = await Profile.findOne({ workorderNum: workorderNum });
//   // Add the workorder Num to the workorder array on the profile
//   profile.workorders.push(workorder.workorderNum);
//   // save the profile
//   const updatedProfile = await profile.save();
//   // Then add the profile onto the workorders profiles array
//   workorder.profiles.push(workorder.workorderNum);
//   // Save the workorder, return msg using res.json() to confirm save
//   const updatedWorkorder = await workorder.save();
//   res.json({ updatedProfile, updatedWorkorder });
// });
//! __________________________________________
