const express = require("express");
const router = express.Router();
const user = require("../Models/User/CreateUser");
const { body, validationResult } = require("express-validator");
const bodyParser =  require("body-parser");
const cookieParser  = require("cookie-parser");
const session = require("express-session");


router.get("/update", async (req, res) => {
   
   try {
     
     const userdata = await user.find({ phoneNo: req.body.phoneNo });
     if (userdata){
       req.session.user = userdata;
       res.send(req.session.user)
     }else{
       res.status(400).json({message : "not working"})
     }
     console.log(userdata);
   } catch (err) {
     res.status(400).json({ message: err.message });
   }
   res.send(req.body);
 });

module.exports = router;
