const express = require("express");
const router = express.Router();
const profiles = require('../controllers/profileController');

// router.get('/create', profiles.profile_create_get)
router.get("/", profiles.listProfiles);
router.post("/", profiles.createProfile);
// router.get('/:id', profiles.profile_details)
// router.delete('/:id', profiles.profile_delete)

module.exports = router;
