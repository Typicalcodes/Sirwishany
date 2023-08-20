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

router.get("/fetchchat/:id",async (req,res)=>{
//about : id feild here is the chatid 
  const {id} = req.params
  console.log(id)
  try {
   const response = await ChatData.findById({_id: id})
      if (!response){
        res.send({message: "resiult nahi aya"}) 
      }else {
        res.send({message: response})
      }
  } catch (error) {
    res.send({message: error.message})
  }
})

router.post("/sendchat/:id",async (req,res)=>{
  const {id}= req.params
  const data = req.body
  console.log(data)
  try {
    const response = await ChatData.findByIdAndUpdate(id,{$push : {chatdetail : data}})
    if(response){
      res.send({message: response})
    }
  } catch (error) {
    res.send({message : error})
  }   
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
        
        
        const newchatfor = ispresent.chattype.date.toISOString();
        
        if(ispresent !== undefined  && newchatfor === chattype.date && ispresent.chattype.time === chattype.time){
          res.send({chatid : ispresent._id})
        }else {
          const data ={
            customer: customer,
            prof: prof,
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
