const Workorder = require("../models/workorderSchema");

exports.createWorkorder = async ({brand, model, colour}) => {
  try {
    const newWorkorder = new Workorder({brand, model, colour});
    const workorder = await newWorkorder.save();
    return workorder.id;
  } catch (err) {
    throw err;
  }
};

  // createWorkorder: async ({ brand, model, colour }) => {
  //   const newWorkorder = {
  //     brand,
  //     model,
  //     colour,
  //   }; 
  //   const workorder = await newWorkorder.save();
  //   console.log("----woController");
  //   return workorder;
  // },


