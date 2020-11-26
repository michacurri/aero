const express = require("express");
const router = express.Router();

const Profile = require("../api/profileSchema");
// // ! BELOW LINE NEEDS TO BE FIXED TO POINT TO THE CORRECT FILE
// // THERE WERE TWO Workorder.js
// //WorkorderComp was adapted, and imports likely need checking
const Workorder = require("../api/workorderSchema");

router.get("/", async (req, res) => {
  const profiles = await Profile.find();
  res.json(profiles);
});

router.post("/", async (req, res) => {
  const { memberId, firstName, lastName, phone, email } = req.body;

  const newProfile = new Profile({
    memberId,
    firstName,
    lastName,
    phone,
    email,
  });

  const profile = await newProfile.save();

  res.json(profile);
});


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

module.exports = router;
