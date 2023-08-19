const mongoose = require("mongoose");
const { Schema } = mongoose;

const address = new Schema({
  place: { type: String },
  city: { type: String , default: "Not added"},
  state: { type: String },
});

const ibooking = new Schema({
  date: { type: Date, required: true },
  address: address,
  time: { type: String, required: true },
  worktype: { type: String, required: true },
  subtype: { type: String   },
  status: { type: String, default: "active" },
  userId: {type: String},
  chatId: {type: String}
});

const Prof = new Schema({
  phoneNo: { type: Number, unique: true, required: true },
  name: { type: String,default: "Not Named"},
  worktype: { type: String, default: "Not Specified" },
  address: address,
  status: { type: String, default: "off" },
  bookings: [ibooking],
});

module.exports = mongoose.model("Workeruesr", Prof);
