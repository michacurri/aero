const express = require("express");
const router = express.Router();
const profile = require("../controllers/profileController");

router.get("/search/all", profile.listProfiles);
router.get("/search/memberId/:memberId", profile.findProfileByMemberId);
router.get("/search/phone/:phone", profile.findProfileByPhone);
router.get("/search/email/:email", profile.findProfileByEmail);
router.post("/create", profile.createProfile);
// router.delete('/:id', profile.profile_delete)

module.exports = router;
