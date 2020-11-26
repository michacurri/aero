const Profile = require("./profileSchema");

module.exports = {
  listProfiles: (req, res) => {
    Profile.find().then((records) => res.send(records));
  },

  createProfile: (req, res) => {
    const profile = new Profile(req.body);
    profile
      .save()
      .then(() => res.sendStatus(200))
      .catch((err) => res.sendStatus(500));
  },
};
