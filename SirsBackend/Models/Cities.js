const mongoose = require("mongoose");
const { Schema } = mongoose;

const citiesSchema = new Schema({
  id: { type: Number, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  state: { type: String, required: true },
  services: {type: Array}
});
module.exports = mongoose.model("cities", citiesSchema);
