const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const messageModel = require("../models/messageModel");

const getAllMessages = async (req, res, next) => {
  const messages = await messageModel.getAllMessages();
  res.status(200).json({
    status: "success",
    data: {
      messages,
    },
  });
};

const getMessagesByChatId = async (req, res, next) => {
  const { sender_id, receiver_id } = req.params;
  if (!sender_id || isNaN(sender_id) || !receiver_id || isNaN(receiver_id)) {
    return next(new AppError("Please provide sender and receiver id", 400));
  }
  const chatId = { sender_id, receiver_id };
  const messages = await messageModel.getMessagesByChatId(chatId);
  res.status(200).json({
    status: "success",
    data: {
      messages,
    },
  });
};

const createMessage = async (req, res, next) => {
  const message = req.body;
  const newMessage = await messageModel.createMessage(message);
  res.status(201).json({
    status: "success",
    data: {
      message: newMessage,
    },
  });
};

module.exports = {
  getAllMessages: catchAsync(getAllMessages),
  getMessagesByChatId: catchAsync(getMessagesByChatId),
  createMessage: catchAsync(createMessage),
};
