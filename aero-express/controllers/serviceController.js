const Services = require("../models/serviceSchema");

exports.findService = async (title) => {
  try {
    const serviceRes = await Services.find({ title });
    return serviceRes;
  } catch (err) {
    throw err;
  }
};

exports.createService = async ({ serviceType, title, desc, price }) => {
  try {
    const newService = new Service({
      serviceType,
      title,
      desc,
      price,
    });
    const service = await newService.save();
    return service;
  } catch (err) {
    console.log(`error: ${err}`);
  }
};
