const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const messageController = require("../controllers/messageController");

router.post("/", convertCamelToSnake, messageController.createMessage);
router.get("/", messageController.getAllMessages);
router.get(
  "/:sender_id/:receiver_id/:subscription_id",
  messageController.getMessagesByChatId
);

module.exports = router;
