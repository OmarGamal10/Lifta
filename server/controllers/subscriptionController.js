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
  const { status } = req.body,
    { id: subscription_id } = req.params;
  let subscription;
  console.log(status);
  if (status) {
    const start_date = new Date();
    const duration =
      await subscriptionModel.getDurationBySubscriptionId(subscription_id);
    const end_date = new Date(
      start_date.getTime() + duration * 30 * 24 * 60 * 60 * 1000
    ).toISOString();
    subscription = await subscriptionModel.subscriptionResponse(
      subscription_id,
      status,
      start_date,
      end_date
    );
  } else {
    subscription = await subscriptionModel.subscriptionResponse(
      subscription_id,
      status,
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

const getPendingSubscriptionsByCoachId = async (req, res, next) => {
  const { id: coach_id } = req.params;
  const subscriptions =
    await subscriptionModel.getPendingSubscriptionsByCoachId(coach_id);
  res.status(200).json({
    status: "success",
    data: {
      subscriptions,
    },
  });
};

module.exports = {
  getAllSubscriptions: catchAsync(getAllSubscriptions),
  createInitialSubscription: catchAsync(createInitialSubscription),
  subscriptionResponse: catchAsync(subscriptionResponse),
  getPendingSubscriptionsByCoachId: catchAsync(
    getPendingSubscriptionsByCoachId
  ),
};
