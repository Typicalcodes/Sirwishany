const express = require("express");
const router = express.Router();
const Prof = require("../Models/Worker/WorkerUser");

router.use("/createuser",
async (req, res) => {

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  const userdata = await Prof.find({ phoneNo: req.body.phoneNo });

  if (userdata.length > 0) {
    req.session.user = userdata;
    res.json(userdata);
  } else {
    try {
      const data = new Prof({
        phoneNo: req.body.phoneNo
      })
      const saves = await data.save();
      req.session.user = saves;
      res.json({newuser: true, user: saves})
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  
  }
 
 
 }
)
module.exports =router