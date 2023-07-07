const mongoose = require("mongoose");
const { Schema } = mongoose;


const chats = new Schema({
    chatuser: {type: Number, required: true},
    message: {type: String},
    chattime: {type: String}
})
  
const chatdetail= new Schema({
    chatdate: {type: Date, default: Date.now},
    chats
})
  
const chatData = new Schema({
    customer: {type: String},
    prof : {type: String},
    chatfile: [chatdetail]
});

module.exports = mongoose.model("ChatData",chatData)