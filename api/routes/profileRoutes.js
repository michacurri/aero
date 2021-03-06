const express = require("express");
const {
  createProfile,
  findProfileByEmail,
  findProfileById,
  findProfileByAny,
} = require("../controllers/profileController");
const { verifyToken } = require("../middleware/verifyToken");
const { createToken } = require("../tokens/tokenService");

const router = express.Router();

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
.route("/search/:searchValue")
.get(async (req, res) => {
  const { searchValue } = req.params;
  if (!searchValue || searchValue === "") {
    res.status(400).json({ message: "nothing to search" });
    return;
  } else {
    try {
      const match = await findProfileByAny(searchValue);
      if (!match) {
        res
          .status(400)
          .json({ message: `Search for "${searchValue}" returned no results` });
        return;
      }
      res.status(200).json(match);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
});

router
  .use(verifyToken)
  .route("/this-profile")
  .get(async (req, res) => {
    try {
      const profile = await findProfileById(req.profile.id);
      res.json({ data: profile });
    } catch (err) {
      console.log(err);
    }
  });

module.exports = router;
