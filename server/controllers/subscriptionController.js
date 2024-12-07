const subscriptionModel = require("../models/subscriptionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const getAllSubscriptions = async (req, res, next) => {
  const subscriptions = await subscriptionModel.getAllSubscriptions();
  res.status(200).json({
    status: "success",
    data: {
      subscriptions,
    },
  });
};

const createInitialSubscription = async (req, res, next) => {
  const { trainee_id, package_id } = req.body;
  const subscription = await subscriptionModel.createSubscription(
    trainee_id,
    package_id,
    (status_ = "Pending")
  );
  res.status(201).json({
    status: "success",
    data: {
      subscription,
    },
  });
};

const subscriptionResponse = async (req, res, next) => {
  const { response } = req.body,
    { id: subscription_id } = req.params;
  let subscription;
  console.log(response);
  if (response) {
    const start_date = new Date();
    const duration =
      await subscriptionModel.getDurationBySubscriptionId(subscription_id);
    const end_date = new Date(
      start_date.getTime() + duration * 30 * 24 * 60 * 60 * 1000
    ).toISOString();
    subscription = await subscriptionModel.subscriptionResponse(
      subscription_id,
      response,
      start_date,
      end_date
    );
  } else {
    subscription = await subscriptionModel.subscriptionResponse(
      subscription_id,
      response,
      null,
      null
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      subscription,
    },
  });
};

module.exports = {
  getAllSubscriptions: catchAsync(getAllSubscriptions),
  createInitialSubscription: catchAsync(createInitialSubscription),
  subscriptionResponse: catchAsync(subscriptionResponse),
};
