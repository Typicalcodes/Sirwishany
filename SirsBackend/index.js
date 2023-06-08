const connecttomongo = require("./db");
connecttomongo();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const router = express.Router();
const user = require("../SirsBackend/Models/User/CreateUser");
const { body, validationResult } = require("express-validator");
const { cookie } = require("express-validator");
const app = express();
const port = 3000;
//middleware
app.use(
  cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    key: "userId",
    secret: "romromji",
    resave: false,
    saveUninitialized: false,
    cookie: {
     
      expires: 216000000,
      
    },
  })
);



//app.use('/api/city',require('./Routes/cities.js'))
app.use("/api", require("./Routes/cities"));
app.use("/user", require("./Routes/UserLogin"));
//categoray
app.use("/cat", require("./Routes/CategoryMan"));
app.use("/choice", require("./Routes/Svgstore"));


//! special apis for login user
app.post("/user/login",
async (req, res) => {

  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  const userdata = await user.find({ phoneNo: req.body.phoneNo });

  if (userdata.length > 0) {
    req.session.user = userdata;
    res.json(userdata)
  } else {
    try {
      const data = new user({
        phoneNo: req.body.phoneNo
      })
      const saves = await data.save();
      req.session.user = saves;
      res.json(saves)
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  
  }
 
 
 }
)

//! for check login
app.get("/user/login", async (req,res)=>{
 
  if (req.session.user){
    res.send({loggedin: true, user: req.session.user})
  }else{
    res.send({loggedin: false})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
