const router = require("express").Router();
const subscriptionController = require("../controllers/subscriptionController");
const convertCamelCase = require("../middlewares/camelToSnakeMiddleware");

// a new subscription won't have a start date or an end date, and will have status pending until it's approved

router.get("/", subscriptionController.getAllSubscriptions);
router.get(
  "/trainer/pending/:id",
  subscriptionController.getPendingSubscriptionsByCoachId
);
router.get("/:type/conversations/:id", subscriptionController.getConversations);
router.get(
  "/memberships/trainee/:traineeId",
  subscriptionController.getMemberships
);
router.get(
  "/memberships/trainee/:traineeId/trainer/:trainerId",
  subscriptionController.getMemberships
);
router.post(
  "/",
  convertCamelCase,
  subscriptionController.createInitialSubscription
);
router.patch(
  "/:id",
  convertCamelCase,
  subscriptionController.subscriptionResponse
);

router.get(
  "/hasGymSubscription/:id",
  subscriptionController.getTraineeHasGymSubscription
);
router.get(
  "/hasNutritionSubscription/:id",
  subscriptionController.getTraineeHasNutritionSubscription
);

router.get(
  "/subscriptionsCountByPackageType",
  subscriptionController.getSubscriptionsCountByPackageType
);
router.get(
  "/activeSubscriptionsCount",
  subscriptionController.getActiveSubscriptionsCount
);

module.exports = router;
