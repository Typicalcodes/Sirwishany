const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017"

const connecttomongo = async ()=>{
    await mongoose.connect(mongoURI, ()=>{
        console.log("database is connected")
    })
}
module.exports = connecttomongo;