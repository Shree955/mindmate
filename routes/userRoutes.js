const express = require("express");
const {
  registerUser,
  loginUser,
  updateUser,
} = require("../controllers/userControllers");
const router = express.Router();

router.put("/:id", updateUser);
router.post("/register", registerUser);
router.post("/login", loginUser);


module.exports = router;
