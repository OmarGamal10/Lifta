const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const userModel = require("../models/userModel");

const deleteUserByUserId = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId || isNaN(userId)) {
    return next(new AppError("Please provide a user id", 400));
  }
  await userModel.deleteUserByUserId(userId);
  res.status(200).json({
    status: "success",
    message: "User deleted successfully",
  });
};

const banUser = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId || isNaN(userId)) {
    return next(new AppError("Please provide a user id", 400));
  }
  await userModel.banUser(userId);
  res.status(200).json({
    status: "success",
    message: "User banned successfully",
  });
};

const unbanUser = async (req, res, next) => {
  const { userId } = req.params;
  if (!userId || isNaN(userId)) {
    return next(new AppError("Please provide a user id", 400));
  }
  await userModel.unbanUser(userId);
  res.status(200).json({
    status: "success",
    message: "User unbanned successfully",
  });
};

module.exports = {
  deleteUserByUserId: catchAsync(deleteUserByUserId),
  banUser: catchAsync(banUser),
  unbanUser: catchAsync(unbanUser),
};
