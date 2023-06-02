const connecttomongo = require('./db');
connecttomongo();

const express = require('express')
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const { cookie } = require('express-validator');
const app = express()
const port = 3000
//middleware 
app.use(cors({
  origin : ["http://localhost:3001"],
  methods : ["GET","POST"],
  credentials : true
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended :true}))
app.use(session
  ({
    key: "userId",
    secret: "romromji",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60*60*24,
    }
  }))
app.use(express.json())

//app.use('/api/city',require('./Routes/cities.js'))
app.use('/api',require('./Routes/cities'))
app.use('/user',require('./Routes/UserLogin'))
//categoray api
app.use('/cat',require('./Routes/CategoryMan'))
app.use('/choice',require('./Routes/Svgstore'))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})