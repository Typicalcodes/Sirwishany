const express = require("express");
const router = express.Router();
const Cities = require("../Models/Cities");

router.post("/add", async (req, res) => {
  try {
    await Cities.insertMany(req.body);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  res.send(req.body);
});
router.get("/find", async (req, res) => {
  try {
    const city = await Cities.find({ name: req.body.name });
    console.log(city);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  res.send(req.body);
});
router.delete("/delete", async (req, res) => {
  try {
    await Cities.deleteOne({ name: req.body.name });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  res.send(req.body);
});
router.get("/getallcity", async (req, res) => {
  console.log(req.body);
  try {
    const city = await Cities.find({});
    res.json(city);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
module.exports = router;
