const db = require("../db");
const express = require("express");
const router = express.Router({ mergeParams: true }); // Enable mergeParams
const ingredientController = require("../controllers/ingredientController");
const convertCamelToSnake = require("../middlewares/camelToSnakeMiddleware");
const sanitizeEmptyFields = require("../middlewares/sanitizeEmptyFields");
router.get("/", (req, res, next) => {
  return ingredientController.getIngredientsCoach(req, res, next);
});

router.post(
  "/",
  convertCamelToSnake,
  sanitizeEmptyFields,
  ingredientController.createIngredient
);

module.exports = router;
