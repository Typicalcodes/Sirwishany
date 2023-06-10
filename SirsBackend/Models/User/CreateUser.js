const mongoose = require("mongoose");
const { Schema } = mongoose;

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
const user = new Schema({
  phoneNo: { type: Number, unique: true, required: true },
  name: { type: String, default : "Verified Customer" },
  bookings: [ibooking],
  addresses: [address]
});
module.exports = mongoose.model("NewUser", user);
