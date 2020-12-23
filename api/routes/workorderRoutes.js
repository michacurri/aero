const express = require("express");
const router = express.Router();
const Workorder = require("../models/workorderModel");
const Profile = require("../models/profileModel");
const { verifyToken } = require("../middleware/verifyToken");

//! not in use currently

// TODO
// @route   GET/workorders
// @desc    Returns all workorders
// @access  Public
router.get("/", async (req, res) => {
  try {
    const workorders = await Workorder.find();
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
    dateIn,
    // dateOut,
    brand,
    model,
    colour,
    // service,
    // status,
    // parts,
  } = req.body;

  const newWorkorder = new Workorder({
    dateIn,
    // dateOut,
    brand,
    model,
    colour,
    // service,
    // status,
    // parts,
  });

  try {
    const workorder = await newWorkorder.save();
    res.json(workorder);
  } catch (err) {
    res.json({ error: err });
  }
});


// cut and pasted from profileRoutes.js 
// will need to be modified to not push, but create NEW
router
  .use(verifyToken)
  .route("/create/:profileId")
  .post(async (req, res) => {
    const { brand, model, colour } = req.body;
    const { profileId } = req.params;
    // if (!dateIn || dateIn === " ") {
    //   res.status(400).json({ message: "dataIn must be provided" });
    //   return;
    // }
    if (!brand || brand === " ") {
      res.status(400).json({ message: "brand must be provided" });
      return;
    }
    if (!model || model === " ") {
      res.status(400).json({ message: "model must be provided" });
      return;
    }
    if (!colour || colour === " ") {
      res.status(400).json({ message: "colour must be provided" });
      return;
    }
    try {
      console.log("I am here");
      const thisProfile = await Profile.findById(profileId);
      if (!thisProfile) {
        res
          .status(400)
          .json({ message: `a profile with this id does not exist` });
      } else {

        const workorder = { brand, model, colour };
        thisProfile.workorders.push(workorder);
        await thisProfile.save();

        res.status(200).json({ data: { workorders: thisProfile.workorders } });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

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

module.exports = router;
