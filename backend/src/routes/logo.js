// routes/cafeRoutes.js

const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs")
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// Create a new café
router.post("/upload", upload.single("logo"), (req, res) => {
  res.send({imageUrl: "http://localhost:3333/logo/get/"+req.file.filename});
});

// Retrieve all cafés
router.get('/get/:fileName', (req, res)=>{

     const fileName = req.params.fileName
     const filePath = "./uploads/"+fileName
     const src = fs.createReadStream(filePath);
     src.pipe(res);

});

module.exports = router;
