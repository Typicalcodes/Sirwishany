const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  phoneNo: { type: Number, unique: true, required: true },
  name: { type: String, default : "Verified Customer" },
  bookings: {type: Array},
  addresses: {type: Array}
});
module.exports = mongoose.model("NewUser", user);
