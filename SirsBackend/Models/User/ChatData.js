const mongoose = require("mongoose");
const { Schema } = mongoose;


const chats = new Schema({
    chatuser: {type: Number, required: true},
    message: {type: String},
    chattime: {type: String}
})
  
const chatdetail= new Schema({
    chatdate: {type: Date, default: Date.now},
    chats : [chats]
})

const ibooking = new Schema({
    date : {type: Date, required: true },
    time : {type: String, required: true},
    worktype : {type: String, required: true},
  })
const chatData = new Schema({
    customer: {type: String},
    prof : {type: String},
    chattype: ibooking
});

module.exports = mongoose.model("ChatData",chatData)