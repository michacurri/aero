const express = require("express");
const router = express.Router();
const Workorder = require("../models/workorderSchema");

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
