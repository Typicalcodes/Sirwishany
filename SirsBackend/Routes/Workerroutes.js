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

  if (userdata.length > 0 && userdata[0].name !== "Not Named") {
    console.log(userdata.name)
    req.session.user = userdata;
    res.json(userdata);
  } else if (!userdata){
    try {
      const data = new Prof({
        phoneNo: req.body.phoneNo
      })
      const saves = await data.save();
      req.session.user = {type: "Prof",data: saves};
      res.json({newuser: true, user: saves})
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }else if (userdata[0].name === "Not Named"){
    res.json({newuser: true})
  }
 
 
 }
)
router.use("/login", async (req,res)=>{ 
  if (req.session.user && req.session.user.type === "Prof"){
    console.log(req.session.user)
    const userdata = await user.find({ phoneNo: req.session.user.data[0].phoneNo });
    res.send({loggedin: true, user: userdata})
    console.log(userdata)
  }else{
    res.send({loggedin: false})
  }
})
module.exports =router