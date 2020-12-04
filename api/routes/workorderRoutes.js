const express = require("express");
const router = express.Router();

// TODO
// Require Models
// const Profile = require("../models/profileModel");
const Workorder = require("../models/workorderSchema");

// TODO
// @route   GET/workorders
// @desc    Returns all workorders
// @access  Public
router.get("/", async (req, res) => {
  // Gets all documents from workorders
  try {
    const workorders = await Workorder.find();
    // use express SYNTAX to retrieve the documents
    res.json(workorders);
  } catch (err) {
    res.json({ error: err });
  }
});

// TODO
// @route   POST /workorders
// @desc    Add a new workorder
// @access  Public
router.post("/", async (req, res) => {
  // Create a new workorder from the information entered through req.body
  const {
    workorderNum,
    dateIn,
    dateOut,
    brand,
    model,
    colour,
    service,
    status,
    parts,
  } = req.body;

  const newWorkorder = new Workorder({
    workorderNum,
    dateIn,
    dateOut,
    brand,
    model,
    colour,
    service,
    status,
    parts,
  });

  try {
    const workorder = await newWorkorder.save();
    res.json(workorder);
  } catch (err) {
    res.json({ error: err });
  }
});

// TODO
// 1.   Create / Find Profile
// 2.   with profileId loaded, create new workorder

// @route   POST /profiles/:profileId
// @desc    Add a workoder object to a profile based on the profileId passed in as a param
// @access  Public

// router.post("/:profileId", async (req, res) => {
//   const { profileId } = req.params;
//   const { memberId } = req.body;

//   // Find the profile based on profileId in req.params
//   const profile = await Profile.findById(profileId);
//   // Find the workorder based on the member phone
//   const workorder = await Workorder.find({ phone: phone });

//   workorder.profiles.push(profile.name);
//   const updatedWorkorder = await workorder.save();
//   profile.workorder.push(workorder.workorderNum);
//   const updatedProfile = await profile.save();
//   res.json({ updatedWorkorder, updatedProfile });
// });

// TODO
// Patch a workorder
// will update whatever piece needs updating; no more

router.patch("/:workorderId", (req, res) => {
  const id = req.params.workorderId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Workorder.update({ _id: id }, { set: updateOps })
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

// TODO
// Export router
module.exports = router;
