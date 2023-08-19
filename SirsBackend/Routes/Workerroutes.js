const express = require("express");
const router = express.Router();
const Prof = require("../Models/Worker/WorkerUser");

router.post("/login", async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });

  const userdata = await Prof.find({ phoneNo: req.body.phoneNo });
  //console.log(userdata)
  if (userdata.length > 0 && userdata[0].name !== "Not Named") {
    req.session.user = { type: "Prof", data: userdata };
    res.json(userdata);
    //console.log(userdata[0].name)
  } else if (userdata.length == 0) {
    try {
      const data = new Prof({
        phoneNo: req.body.phoneNo,
      });
      const saves = await data.save();
      req.session.user = { type: "Prof", data: [saves] };
      res.json({ newuser: true, data: saves });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  } else if (userdata.length > 0 && userdata[0].name === "Not Named") {
    req.session.user = { type: "Prof", data: userdata };
    res.json({ newuser: true });
  } else {
    res.json({ error: "erorrs now" });
  }
});
router.get("/login", async (req, res) => {
  if (req.session.user && req.session.user.type === "Prof") {
    //console.log(req.session.user)
    const userdata = await Prof.find({
      phoneNo: req.session.user.data[0].phoneNo,
    });
    if (userdata.name === "Not Named") {
      res.send({ loggedin: false });
    } else {
      res.send({ loggedin: true, user: userdata });
    }
    //console.log(userdata)
  } else {
    res.send({ loggedin: false });
  }
});
router.post("/updateuser", async (req, res) => {
  const { name, status, worktype, address } = req.body;

  if (req.session.user && req.session.user.type === "Prof") {
    try {
      const fu = await Prof.updateOne(
        { phoneNo: req.session.user.data[0].phoneNo },
        { name, status, worktype, address },
        { new: true }
      );

      res.send(fu);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.send({ loggedin: false });
  }
});

router.post("/updatestate", async (req, res) => {
  const { status } = req.body;

  if (req.session.user && req.session.user.type === "Prof") {
    try {
      const fu = await Prof.updateOne(
        { phoneNo: req.session.user.data[0].phoneNo },
        { status },
        { new: true }
      );

      res.send(fu);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.send({ loggedin: false });
  }
});
// NOTE: For Checking the No Of Bookings
router.get("/checkcount/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Prof.findById({
      _id: id,
    });

    res.json({ qty: response.bookings.length });
  } catch (error) {
    res.status(500).json({ message: error });
    console.log(error);
  }
});

router.post("/updatejob/:id", async (req, res) => {
  const { id } = req.params;

  const { time, date, chatid } = req.body;
  try {
    const response = await Prof.updateOne(
      { _id: id, bookings: { $elemMatch: { time: time, date: date } } },
      { $set: { "bookings.$.status": "accepted", "bookings.$.chatId":  chatid} }
    ).exec((err, result) => {
      if (err) {
        res.send({ message: err.message });
      }
      if (!result) {
        res.send({ message: "result not found" });
      } else {
        res.send({ message: result });
      }
    });
  } catch (error) {
    res.status(500).json({ type: "end message", message: error });
  }
});


router.delete("/deletejob/:id", async (req, res) => {
  const { id } = req.params;
  const deletebook = req.body;
  try {
    const response = await Prof.findByIdAndUpdate(
      { _id: id },
      {
        $pull: {
          bookings: { time: deletebook.item.time, date: deletebook.item.date },
        }
      }
    );
    res.json({ message: response });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
module.exports = router;
