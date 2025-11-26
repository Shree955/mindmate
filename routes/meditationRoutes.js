const express = require("express");
const {
  logMeditation,
  getMeditationLogs,
} = require("../controllers/meditationController");
const router = express.Router();

router.post("/log", logMeditation);
router.get("/:userId", getMeditationLogs);

module.exports = router;
