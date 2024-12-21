const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const mealController = require("../controllers/mealController");
const ingredientRouter = require("./ingredientRoute");
const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");

router.get("/", (req, res, next) => {
  return mealController.getCurrentMealsByTraineeId(req, res, next);
});

router.use("/:mealId/ingredients", ingredientRouter);

// router.get("/:mealId/status/:type", (req, res, next) => {
//   return mealController.getCurrentMealStatusByType(req, res, next);
// });

router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  mealController.addDoneMeal
);

router.delete(
  "/:type/removeDoneMeal",
  convertCamelToSnake,
  mealController.removeDoneMeal
);

module.exports = router;
