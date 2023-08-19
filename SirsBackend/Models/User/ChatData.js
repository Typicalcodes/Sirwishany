const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatdetail= new Schema({
    chatuser: {type: String, required: true},
    message: {type: String},
    chattime: {type: Date, default: Date.now}
})

const ibooking = new Schema({
    date : {type: Date, required: true },
    time : {type: String, required: true},
    worktype : {type: String, required: true},
  })
const chatData = new Schema({
    customer: {type: String},
    prof : {type: String},
    chattype: ibooking,
    chatdetail : [chatdetail]
});

module.exports = mongoose.model("ChatData",chatData)