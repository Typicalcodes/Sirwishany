const express = require("express")
const router = express.Router();
const Prof = require("../Models/Worker/WorkerUser");
const user = require("../Models/User/CreateUser");
const ChatData = require("../Models/User/ChatData");
router.get("/findid", async (req,res)=>{
    const customer = "647acf1a9dd502069887ab00";
    user.findOne({_id: customer}).populate('chat').exec((err,result)=>{
      if(err){
        res.send({message: err.message})
      }
      if(!result){
        console.log("not found")
      }
      res.send({chat:result})
    })
  })
  
  router.post("/findchat", async (req, res) => {
    const  {customer,prof,chattype} = req.body
    try {
        const response = await user.findOne({_id: customer}).populate('chat').exec(async (err,result)=>{
        if (err){
          return err
        }
        if (!result){
          return 0
        }
        const ispresent = result.chat.find(chat => chat.customer === customer && chat.prof === prof);
        if(ispresent !== undefined){
          res.send({chatid : ispresent._id})
        }else {
          const data ={
            customer: "647f67146b7421de54f60e9a",
            prof: "6494906adfd28119d11666e2",
            chattype
          };
          const newchat= new ChatData(data);
          const response = await newchat.save()
          result.chat.push(newchat)
          await result.save((err, updateduser) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log("document is saved", updateduser);
            res.send({chatid : newchat._id})
          });
        }
      });
      }
     catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
module.exports = router;
