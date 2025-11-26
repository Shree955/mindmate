const express = require("express");
const router = express.Router();
const { incrementChatCount, getChatCount } = require("../controllers/chatController");

router.post("/increment", incrementChatCount);
router.get("/:userId", getChatCount);

module.exports = router;
