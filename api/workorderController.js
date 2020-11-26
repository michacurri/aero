const Workorder = require("./workorderSchema");

module.exports = {
  listWorkorders: (req, res) => {
    Workorder.find().then((records) => res.send(records));
  },

  createWorkorder: (req, res) => {
    const workorder = new Workorder(req.body);
    workorder
      .save()
      .then(() => res.sendStatus(200))
      .catch((err) => res.sendStatus(500));
  },
};
