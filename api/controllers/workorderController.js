const Workorder = require("../models/workorderModel");
const Profile = require("../models/profileModel");

exports.createWorkorder = async ({ userId, brand, model, colour }) => {
  try {
    const profile = await Profile.findById(userId);
    const newWorkorder = new Workorder({
      profileId: profile.id,
      brand,
      model,
      colour,
    });
    const workorder = await newWorkorder.save();
    //! push workorderId's into the workorders array in Profile
    profile.workorders.push(newWorkorder);
    const updateProfile = await profile.save();
    return workorder;
  } catch (err) {
    console.log(`error: ${err}`);
  }
};

exports.findWorkorders = async (profile) => {
  try {
    const workorderRes = await Workorder.find({ profile });
    return workorderRes;
  } catch (err) {
    throw err;
  }
};
