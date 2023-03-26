const express = require("express");
const router = express.Router();
const user = require("../Models/User/CreateUser");

router.post("/login", async (req, res) => {
  
    try {
      
      await user.create(req.body);
  
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
    res.send(req.body);
  });
module.exports = router;