const express = require("express");
const router = express.Router();
const user = require("../Models/User/CreateUser");
const { body, validationResult } = require("express-validator");

router.post(
  "/login",
  body("phoneNo").isLength({ max: 10 }),
  body("phoneNo").isLength({ min: 10 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      await user.create(req.body);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    res.send(req.body);
  }
);
router.get("/getdata", async (req, res) => {
  try {
    const userdata = await user.find({ phoneNo: req.body.phoneNo });
    console.log(userdata);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  res.send(req.body);
});

module.exports = router;
