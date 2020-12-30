const express = require("express");
const router = express.Router();
const Workorder = require("../models/workorderModel");
const { verifyToken } = require("../middleware/verifyToken");
const { createToken } = require("../tokens/tokenService");
const { findProfileById } = require("../controllers/profileController");
const { createWorkorder } = require("../controllers/workorderController");

// TODO
// @route   GET/workorders
// @desc    Returns all workorders
// @access  Public
// router.get("/", async (req, res) => {
//   try {
//     const workorders = await Workorder.find();
//     res.json(workorders);
//   } catch (err) {
//     res.json({ error: err });
//   }
// });

// TODO
// @route   POST /workorders
// @desc    Add a new workorder
// @access  Public
// router.post("/create", async (req, res) => {
//   // Create a new workorder from the information entered through req.body
//   const {
//     // dateIn,
//     // dateOut,
//     brand,
//     model,
//     colour,
//     // service,
//     // status,
//     // parts,
//   } = req.body;

//   const newWorkorder = new Workorder({
//     // dateIn,
//     // dateOut,
//     brand,
//     model,
//     colour,
//     // service,
//     // status,
//     // parts,
//   });

//   try {
//     const workorder = await newWorkorder.save();
//     res.json(workorder);
//   } catch (err) {
//     res.json({ error: err });
//   }
// });

// cut and pasted from profileRoutes.js
// will need to be modified to not push, but create NEW
router
  // .use(verifyToken)
  .route("/create/:userId")
  .post(async (req, res) => {
    const { brand, model, colour } = req.body;
    const { userId } = req.params;
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
      // const profile = await findProfileById(userId);
      const newWorkorder = await createWorkorder({
        // profile,
        userId,
        // dateIn,
        // dateOut,
        brand,
        model,
        colour,
        // service,
        // status,
        // parts,
      });
      // console.log(`|||| workorderRoutes:96 "newWorkorder": ${newWorkorder}`);
      res.status(200).json({ newWorkorder });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
    // try {
    //   const workorder = await newWorkorder.save();
    //   res.json(workorder);
    // } catch (err) {
    //   res.json({ error: err });
    // }
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
