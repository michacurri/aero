const express = require("express");
const Profile = require("../models/profileModel");
// const Workorder = require("../models/workorderSchema");
const {
  createProfile,
  findProfileByEmail,
  findProfileById,
} = require("../controllers/profileController");
const { createWorkorder } = require("../controllers/workorderController");
const { verifyToken } = require("../middleware/verifyToken");
const { createToken } = require("../tokens/tokenService");

const router = express.Router();
router.get("/search/email/:email", findProfileByEmail);

router.route("/create").post(async (req, res) => {
  const { firstName, lastName, email, phone, password } = req.body;
  if (!firstName || firstName === " ") {
    res.status(400).json({ message: "firstName must be provided" });
    return;
  }
  if (!lastName || lastName === " ") {
    res.status(400).json({ message: "lastName must be provided" });
    return;
  }
  if (!email || email === " ") {
    res.status(400).json({ message: "email must be provided" });
    return;
  }
  if (!phone || phone === " ") {
    res.status(400).json({ message: "phone must be provided" });
    return;
  }
  if (!password || password === " ") {
    res.status(400).json({ message: "password must be provided" });
    return;
  }
  try {
    const profile = await findProfileByEmail(email);
    if (profile) {
      res
        .status(400)
        .json({ message: `a profile with this email already exists` });
    }
    const newProfile = await createProfile({
      firstName,
      lastName,
      email,
      phone,
      password,
    });
    res.status(200).json({ data: { id: newProfile._id } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  if (!email || email === " ") {
    res.status(400).json({ message: "email must be provided" });
    return;
  }
  if (!password || password === " ") {
    res.status(400).json({ message: "password must be provided" });
    return;
  }

  try {
    const profile = await findProfileByEmail(email);
    if (!profile) {
      res.status(400).json({ message: "email and password do not match" });
      return;
    }

    const isMatch = await profile.comparePasswords(password);
    if (!isMatch) {
      res.status(400).json({ message: "email and password do not match" });
      return;
    }
    const token = createToken({ id: profile._id });
    res.cookie("token", token, {
      maxAge: 10000,
    });
    res.status(200).send({});
  } catch (err) {
    console.log(err);
  }
});

router
  .use(verifyToken)
  .route("/workorder/create/:profileId")
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
      console.log(thisProfile);
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

router
  .use(verifyToken)
  .route("/this")
  .get(async (req, res) => {
    try {
      const profile = await findProfileById(req.profile.id);
      res.json({ data: profile });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
