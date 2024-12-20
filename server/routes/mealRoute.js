const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const mealController = require("../controllers/mealController");
const ingredientRouter = require("./ingredientRoute");

const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");

router.get("/", (req, res, next) => {
  return mealController.getMealsNutritionist(req, res, next);
});
router.get("/:mealId/facts", (req, res, next) => {
  return mealController.getMealNutritionInfo(req, res, next);
});

router.get("/trainee/:traineeId", mealController.getMealsTrainee);
router.get("/log/:traineeId", mealController.getMealLog);
router.post("/trainee", mealController.assignMealTrainee);

router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  mealController.createMeal
);

router.delete("/", convertCamelToSnake, mealController.deleteMeal);
router.delete(
  "/:mealId/trainee",
  convertCamelToSnake,
  mealController.removeMealFromDiet
);

router.use("/:mealId/ingredients", ingredientRouter);

module.exports = router;
