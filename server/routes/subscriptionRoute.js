const router = require("express").Router();
const subscriptionController = require("../controllers/subscriptionController");
const convertCamelCase = require("../middlewares/camelToSnakeMiddleware");

// a new subscription won't have a start date or an end date, and will have status pending until it's approved

router.get("/", subscriptionController.getAllSubscriptions);
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

module.exports = router;
