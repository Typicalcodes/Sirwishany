const mongoose = require("mongoose");
const { Schema } = mongoose;

const address= new Schema({
  place: {type: String},
  city: {type: String}, 
  state: {type: String}
})
const user = new Schema({
  phoneNo: { type: Number, unique: true, required: true },
  name: { type: String, default : "Verified Customer" },
  bookings: {type: Array},
  addresses: [address]
});
module.exports = mongoose.model("NewUser", user);
