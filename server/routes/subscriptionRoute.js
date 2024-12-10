const router = require("express").Router();
const subscriptionController = require("../controllers/subscriptionController");
const convertCamelCase = require("../middlewares/camelToSnakeMiddleware");

// a new subscription won't have a start date or an end date, and will have status pending until it's approved

router.get("/", subscriptionController.getAllSubscriptions);
router.get(
  "/trainer/pending/:id",
  subscriptionController.getPendingSubscriptionsByCoachId
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

router.get("/hasGymSubscription/:id", subscriptionController.getTraineeHasGymSubscription);
router.get("/hasNutritionSubscription/:id", subscriptionController.getTraineeHasNutritionSubscription);

module.exports = router;
