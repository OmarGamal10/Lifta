const subscriptionModel = require("../models/subscriptionModel");
const userModel = require("../models/userModel");
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
  if(status) {
      const deleteAllPendingRequests = await subscriptionModel.deleteAllPendingRequests(subscription_id);
      const assignToTrainer = await userModel.assignToTrainer(subscription_id);
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

const getTraineeHasGymSubscription = async (req, res, next) => {
  const { id:trainee_id } = req.params;
  const hasGymSubscription = await subscriptionModel.getTraineeHasGymSubscription(trainee_id);
  res.status(200).json({
    status: "success",
    data: {
      hasGymSubscription,
    },
  });
};

const getTraineeHasNutritionSubscription = async (req, res, next) => {
  const { id:trainee_id } = req.params;
  const hasNutritionSubscription = await subscriptionModel.getTraineeHasNutritionSubscription(trainee_id);
  res.status(200).json({
    status: "success",
    data: {
      hasNutritionSubscription,
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
  getTraineeHasGymSubscription: catchAsync(getTraineeHasGymSubscription),
  getTraineeHasNutritionSubscription: catchAsync(getTraineeHasNutritionSubscription),
};
