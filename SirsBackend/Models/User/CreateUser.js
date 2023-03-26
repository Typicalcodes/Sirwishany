const mongoose = require("mongoose");
const { Schema } = mongoose;

const user = new Schema({
  phoneNo: { type: Number, unique: true, required: true },
  name: { type: String, default : "Verified Customer" },
  bookings: {type: String}
});
module.exports = mongoose.model("NewUser", user);
