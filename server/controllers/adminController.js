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

module.exports = {
  deleteUserByUserId: catchAsync(deleteUserByUserId),
};
