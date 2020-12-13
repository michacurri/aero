const Workorder = require("../models/workorderSchema");

//! not in use currently

exports.createWorkorder = async ({brand, model, colour}) => {
  try {
    const newWorkorder = new Workorder({brand, model, colour});
    const workorder = await newWorkorder.save();
    return workorder.id;
  } catch (err) {
    throw err;
  }
};


