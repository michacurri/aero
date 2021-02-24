const express = require("express");
const router = express.Router();
const Services = require("../models/serviceSchema");

router.route("/").get(async (req, res) => {
  try {
    const services = await Services.find();
    res.json(services);
  } catch (err) {
    res.json({ error: err });
  }
});

router.route("/create").post(async (req, res) => {
  const { serviceType, title, desc, price } = req.body;
  if (!serviceType || serviceType === " ") {
    res.status(400).json({ message: "service type must be provided" });
    return;
  }
  if (!title || title === " ") {
    res.status(400).json({ message: "title must be provided" });
    return;
  }
  if (!desc || desc === " ") {
    res.status(400).json({ message: "description must be provided" });
    return;
  }
  if (!price || price === " ") {
    res.status(400).json({ message: "price must be provided" });
    return;
  }
  try {
    const service = await findService(title);
    if (service) {
      res
        .status(400)
        .json({ message: `a service with this title already exists` });
    }
    const newService = await createService({
      serviceType,
      title,
      desc,
      price,
    });
    res.status(200).json({ data: { id: newService._id } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
