const express = require("express");
const router = express.Router();
const path = require("path");
const AuthService = require("../middleware/User")
const ToDoService = require("../middleware/ToDo")
const multer = require("multer")
const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: function (req, file, cb) {
      cb(null, 'photos-' + Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({ storage });

router.get("/", async (req, res) => {
  res.json("API Created by Cristian Centeno")
})
router.post(
  "/signup", upload.single("avatar"), AuthService.userExists(), AuthService.SignUp(),
  async (req, res, next) => {
    try {
      res.json({message: req.code})
    } catch (err) {
      next(err)
    }
  }
);

router.post("/login", AuthService.Login(), async (req, res, next) => {
  try {
    res.json({
      message: "Logged in",
      _id: req._id,
      token: req.token
    })
  } catch (error) {
    error = new Error("Password incorrect!");
    throw error;
  }
});
module.exports = router;