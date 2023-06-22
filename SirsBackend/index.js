const connecttomongo = require("./db");
connecttomongo();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const Prof = require("../SirsBackend/Routes/Workerroutes");
const user = require("../SirsBackend/Models/User/CreateUser");
const { body, validationResult } = require("express-validator");
const { cookie } = require("express-validator");
const app = express();
const port = 3000;

const http = require("http");
const socketIO = require("socket.io");

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

//worker
app.use("/prof", require("./Routes/Workerroutes"))


const server = http.createServer(app);
const io = socketIO(server,{
  cors: {
    origin: "http://localhost:3001",
    allowedHeaders: {
      "Access-Control-Allow-Origin": true
    },
    credentials: true
  }
});
//! special apis for login user
app.post("/user/login",
async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  const userdata = await user.find({ phoneNo: req.body.phoneNo });

  if (userdata.length > 0) {
    req.session.user = {type: "Consumer", data:userdata};
    res.json(userdata);
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
  if (req.session.user && req.session.user.type === "Consumer"){
    console.log(req.session.user)
    const userdata = await user.find({ phoneNo: req.session.user.data[0].phoneNo });
    res.send({loggedin: true, user: userdata})
    console.log(userdata)
  }else{
    res.send({loggedin: false})
  }
})


io.on("connection", (socket) => {
  console.log("A user connected");  

  // Handle WebSocket messages
  socket.on("booking", async (phoneno) => {
    socket.join(phoneno)
    
    socket.emit("user is connected")
    // Process the received message, update the data in MongoDB if necessary,
    // and emit the updated data to connected clients
  
    io.emit("updatejob",data)
  });


  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});



server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
