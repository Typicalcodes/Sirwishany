const express = require("express");
const router = express.Router();
const user = require("../Models/User/CreateUser");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

router.post("/addAddress", async (req, res) => {
  const { city, place, state } = req.body;

  if (req.session.user) {
    try {
      const fu = await user.updateOne(
        { phoneNo: req.session.user[0].phoneNo },
        {
          $push: {
            addresses: {
              place,
              city,
              state,
            },
          },
        },
        { new: true }
      );
      res.json(fu);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.send({ loggedin: false });
  }
});
router.get("/fetchAddress", async (req, res) => {
  if (req.session.user) {
    try {
      const fu = await user.find({ phoneNo: req.session.user[0].phoneNo });

      res.send(fu[0].addresses);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.send({ loggedin: false });
  }
});
router.post("/bookingnow", async (req, res) => {
  const { date, time, worktype } = req.body;
  const { place, city, state } = req.body.address;
  if (req.session.user) {
    try {
      const address = {
        place,
        city,
        state,
      };
      const fu = await user.updateOne(
        { phoneNo: req.session.user[0].phoneNo },
        {
          $push: {
            bookings: {
              date,
              time,
              worktype,
              address,
            },
          },
        },
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

module.exports = router;
