const express = require("express");
const router = express.Router();
const profile = require('../controllers/profileController');

router.get("/", profile.listProfiles);
router.post("/", profile.createProfile);
// router.get('/create', profile.profile_create_get)
// router.get('/:id', profile.profile_details)
// router.delete('/:id', profile.profile_delete)

module.exports = router;
