const mongoose = require("mongoose");
const { Schema } = mongoose;
const chatData = require("../User/ChatData")
const address= new Schema({
  place: {type: String},
  city: {type: String}, 
  state: {type: String}
})

const ibooking = new Schema({
  date : {type: Date, required: true},
  address : address,
  time : {type: String, required: true},
  worktype : {type: String, required: true},
  status : {type: String, default: "active"}
})

//backend making chat with user sending it to place side by side


const user = new Schema({
  phoneNo: { type: Number, unique: true, required: true },
  name: { type: String, default : "Verified Customer" },
  bookings: [ibooking],
  addresses: [address],
  chat: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: chatData
    }
  ]
});
module.exports = mongoose.model("NewUser", user);
