const express = require("express");
const router = express.Router();
const Category = require("../Models/CategorySchema/Category");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/categoryAdd", upload.single("image"), async (req, res) => {
  
  const imageBuffer = req.file.buffer;
  const { name, Includes,choices } = req.body;
  console.log(typeof Includes)

  const newCat = new Category({ name, image: imageBuffer, Includes : Includes,choices: choices});
  try {
    const newCats = await newCat.save();

    res.json(newCats);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/getCategory/:name", async (req, res) => {
  const {name} = req.params;
  try {
    const js = await Category.find({ name });
    res.json(js);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
module.exports = router;
