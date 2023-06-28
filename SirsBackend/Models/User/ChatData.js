const mongoose = require("mongoose");
const { Schema } = mongoose;


const chats = new Schema({
    chatuser: {type: Number, required: true},
    message: {type: String},
    chattime: {type: String}
})
  
const chatdetail= new Schema({
    chatdate: {type: Date},
    chats
})
  
const chatData = new Schema({
    user: {type: String},
    prof : {type: String},
    chatfile: [chatdetail]
});

module.exports = mongoose.model("ChatData",chatData)