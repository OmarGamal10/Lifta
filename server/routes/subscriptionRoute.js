const router = require("express").Router();
const subscriptionController = require("../controllers/subscriptionController");

// a new subscription won't have a start date or an end date, and will have status pending until it's approved

router.get("/", subscriptionController.getAllSubscriptions);
router.post("/", subscriptionController.createSubscription);

module.exports = router;
