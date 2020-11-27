const express = require("express");
const router = express.Router();

// TODO
// Require Models
const Profile = require("../models/Profile");
const Workorder = require("../models/Workorder");

// TODO
// @route   GET/workorders
// @desc    Returns all workorders
// @access  Public
router.get("/", async (req, res) => {
  // Gets all documents from workorders
  const workorders = await Workorder.find();
  // use express SYNTAX to retrieve the documents
  res.json(workorders);
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
    service: [],
    status: [],
    parts: [],
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
    parts
    });

  const workorder = await newWorkorder.save();
  res.json(workorder);
});

// TODO
// @route   POST /profiles/:workorderId
// @desc    Add id to URI
// @access  Public
router.post("/:workorderId", async (req, res) => {
  const { workorderId } = req.params;
  const { memberId } = req.body;

  // Find the profile based on profileId in req.params
  const workorder = await Workorder.findById(workorderId);
  const profile = await Profile.findOne({ memberId: memberId });

  workorder.profiles.push(profile.name);
  const updatedWorkorder = await workorder.save();
  profile.workorder.push(workorder.workorderNum);
  const updatedProfile = await profile.save();
  res.json({ updatedWorkorder, updatedProfile });
});

// TODO
// Export router
module.exports = router;
