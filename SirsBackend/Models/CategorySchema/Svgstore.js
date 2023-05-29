const mongoose = require("mongoose");
const { Schema } = mongoose;

const svg = new Schema({
    name: { type: String},
    svg: {type: Buffer}  
    });
module.exports = mongoose.model("svg", svg);