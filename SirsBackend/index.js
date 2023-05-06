const connecttomongo = require('./db');
connecttomongo();

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
//middleware 
app.use(cors())
app.use(express.json())

//app.use('/api/city',require('./Routes/cities.js'))
app.use('/api',require('./Routes/cities'))
app.use('/user',require('./Routes/UserLogin'))
//categoray api
app.use('/cat',require('./Routes/CategoryMan'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})