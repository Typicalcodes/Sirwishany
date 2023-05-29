const mongoose = require("mongoose");
const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, unique: true, required: true },
    image: {type: Buffer, required: true},
    Includes: {type: Array},
    choices: {type: Array}
    
    });
module.exports = mongoose.model("categories", categorySchema);
  