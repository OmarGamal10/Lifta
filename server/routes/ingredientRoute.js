const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const ingredientController = require("../controllers/ingredientController");
const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");
const mealController = require("../controllers/mealController");
router.get("/", (req, res, next) => {
  if (req.params.coachId)
    return ingredientController.getIngredientsCoach(req, res, next);
  else if (req.params.mealId)
    return ingredientController.getIngredientsMeal(req, res, next);
});

router.get("/:ingId", (req, res, next) => {
  return ingredientController.getIngredient(req, res, next);
});

router.patch("/:ingId", (req, res, next) => {
  return ingredientController.updateIngredient(req, res, next);
});

router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  ingredientController.createIngredient
);

router.delete("/", convertCamelToSnake, (req, res, next) => {
  if (req.params.mealId)
    return mealController.removeIngredientFromMeal(req, res, next);
  else ingredientController.deleteIngredient;
});

module.exports = router;
