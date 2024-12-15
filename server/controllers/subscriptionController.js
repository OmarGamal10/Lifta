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

const getTraineeHasGymSubscription = async (req, res, next) => {
  const { id: trainee_id } = req.params;
  const hasGymSubscription =
    await subscriptionModel.getTraineeHasGymSubscription(trainee_id);
  res.status(200).json({
    status: "success",
    data: {
      hasGymSubscription,
    },
  });
};

const getTraineeHasNutritionSubscription = async (req, res, next) => {
  const { id: trainee_id } = req.params;
  const hasNutritionSubscription =
    await subscriptionModel.getTraineeHasNutritionSubscription(trainee_id);
  res.status(200).json({
    status: "success",
    data: {
      hasNutritionSubscription,
    },
  });
};

const getConversations = async (req, res, next) => {
  const id = req.params.id;
  const type = req.params.type;
  // i did this because maybe one trainee has more than one subscription for the same trainee

  const rawConvos = await subscriptionModel.getTraineesWithActiveSubscription(
    id,
    type
  );

  const groupedConvos = rawConvos.reduce((acc, trainee) => {
    if (trainee.status === "Active") {
      const existingTrainee = acc.find(
        (t) => t.user_id === trainee.user_id && t.status === "Active"
      );
      if (existingTrainee) {
        existingTrainee.packages.push({
          package_id: trainee.package_id,
          name: trainee.name,
          type: trainee.type,
          subscription_id: trainee.subscription_id,
          status: trainee.status,
        });
      } else {
        acc.push({
          ...trainee,
          packages: [
            {
              package_id: trainee.package_id,
              name: trainee.name,
              type: trainee.type,
              subscription_id: trainee.subscription_id,
              status: trainee.status,
            },
          ],
        });
      }
    } else {
      acc.push({
        ...trainee,
        packages: [
          {
            package_id: trainee.package_id,
            name: trainee.name,
            type: trainee.type,
            subscription_id: trainee.subscription_id,
            status: trainee.status,
          },
        ],
      });
    }
    return acc;
  }, []);

  res.status(200).json({
    status: "success",
    data: {
      convos: groupedConvos,
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
  getTraineeHasNutritionSubscription: catchAsync(
    getTraineeHasNutritionSubscription
  ),
  getConversations: catchAsync(getConversations),
};
