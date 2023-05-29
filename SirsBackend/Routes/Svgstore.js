const express = require("express");
const router = express.Router();
const Svgstore = require("../Models/CategorySchema/Svgstore");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post("/svg",upload.single("svg"),async (req,res)=>{

     const imageBuffer = req.file.buffer;
    const {name}= req.body;
    const data = new Svgstore({name,svg: imageBuffer})
    try {
        const newCats = await data.save();
    
        res.json(newCats);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
})
router.get("/selectsvg/:item",async (req,res)=>{

  //const imageBuffer = req.file.buffer;
    const {item}= req.params;

    try {
        const svg = await Svgstore.find({name: item})
    
        res.json(svg);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
})

module.exports = router;