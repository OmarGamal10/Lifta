const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const ingredientController = require("../controllers/ingredientController");
const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");
router.get("/", (req, res, next) => {
  if (req.params.coachId)
    return ingredientController.getIngredientsCoach(req, res, next);
  else if (req.params.mealId)
    return ingredientController.getIngredientsMeal(req, res, next);
});

router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  ingredientController.createIngredient
);

router.delete("/", convertCamelToSnake, ingredientController.deleteIngredient);

module.exports = router;
