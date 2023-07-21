const connecttomongo = require("./db");
connecttomongo();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");
const Prof = require("../SirsBackend/Models/Worker/WorkerUser");
const user = require("../SirsBackend/Models/User/CreateUser");
const ChatData = require("../SirsBackend/Models/User/ChatData");
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
    methods: ["GET", "POST", "DELETE"],
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
app.use("/prof", require("./Routes/Workerroutes"));
app.use("/chat", require("./Routes/ChatApi"));

const server = http.createServer(app);
const io = socketIO(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3001",
    allowedHeaders: {
      "Access-Control-Allow-Origin": true,
    },
    credentials: true,
  },
});
//! special apis for login user
app.post("/user/login", async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }
  const userdata = await user.find({ phoneNo: req.body.phoneNo });

  if (userdata.length > 0) {
    req.session.user = { type: "Consumer", data: userdata };
    res.json(userdata);
  } else {
    try {
      const data = new user({
        phoneNo: req.body.phoneNo,
      });
      const saves = await data.save();
      req.session.user = saves;
      res.json(saves);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
});



//! for check login
app.get("/user/login", async (req, res) => {
  if (req.session.user && req.session.user.type === "Consumer") {
 
    
   await user.findOne({phoneNo: req.session.user.data[0].phoneNo}).populate('chat').exec((err,result)=>{
      if (err) {
        console.log("eror is ");
      } else {
        if(!result){
          console.log("result not found")
        } else {
          console.log("result is ", result)
          chatsf = result.chat
          res.send({ loggedin: true, user: result , chats : result.chat});
        }
      
      }
    })
  } else {
    res.send({ loggedin: false });
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  // NOTE: Handle WebSocket messages
  socket.on("booking", async (userData) => {
    try {
      const dateiso = userData.tosend.date;
      const datetru = dateiso + "T00:00:00.000+00:00";

      const response = await Prof.updateMany(
        {
          worktype: userData.tosend.worktype,
          "address.city": userData.tosend.address.city,
          "address.state": userData.tosend.address.state,
          status: "Active",
          $expr: { $lt: [{ $size: "$bookings" }, 10] },
          bookings: {
            $not: { $elemMatch: { date: datetru, time: userData.tosend.time } },
          },
        },
        {
          $push: {
            bookings: {
              date: userData.tosend.date,
              time: userData.tosend.time,
              worktype: userData.tosend.worktype,
              address: userData.tosend.address,
              subtype: userData.tosend.subtype,
              userId: userData.tosend.userid,
            },
          },
        }
      );

      const socketid = `${userData.tosend.worktype}${userData.tosend.address.city}${userData.tosend.address.state}`;
      socket.to(socketid).emit("job received", userData.tosend);
    } catch (error) {
      console.log(error);
    }
    // Process the received message, update the data in MongoDB if necessary,
    // and emit the updated data to connected clients
  });
  socket.on("join job", ({ data, message }) => {
    socket.join(data);
  });

  socket.on("send message", ({ data, message }) => {
    let id = `"${data}${message}"`;
    console.log("socket send runs ");
    socket.to(data).emit("received message", message);
    console.log("receving message runs");
  });

  socket.on("create room", (userId) => {
    socket.join(userId);
    console.log("User Connected", userId);
  });
  //todo make a room with worktype city and state and make worker chat join the same user
  socket.on("disconnect", () => {
    console.log("A user disconnected");
    // Additional code to handle disconnection if needed
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
