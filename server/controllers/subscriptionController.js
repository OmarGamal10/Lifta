const subscriptionModel = require("../models/subscriptionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

//initially bas lsa m3mltsh feha haga

const getAllSubscriptions = async (req, res, next) => {
  const subscriptions = await subscriptionModel.getAllSubscriptions();
  res.status(200).json({
    status: "success",
    data: {
      subscriptions,
    },
  });
};

const createSubscription = async (req, res, next) => {
  const { user_id, package_id, start_date, end_date } = req.body;
  if (!user_id || !package_id || !start_date || !end_date) {
    return next(new AppError("Please provide all required fields", 400));
  }
  const subscription = await subscriptionModel.createSubscription(
    user_id,
    package_id,
    start_date,
    end_date
  );
  res.status(201).json({
    status: "success",
    data: {
      subscription,
    },
  });
};

module.exports = {
  getAllSubscriptions: catchAsync(getAllSubscriptions),
  createSubscription: catchAsync(createSubscription),
};
