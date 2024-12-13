const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const mealModel = require("../models/mealModel");

const createMeal = async (req, res, next) => {
  const { name, nutritionist_id, ingredients, picture } = req.body;

  const meal = await mealModel.createMeal(
    nutritionist_id,
    name,
    picture,
    ingredients
  );
  res.status(201).json({
    status: "success",
    data: {
      meal,
    },
  });
};

const getMealsNutritionist = async (req, res, next) => {
  const { nutritionistId } = req.params;
  if (!nutritionistId || isNaN(nutritionistId)) {
    return next(new AppError("Please provide a nutritionist id", 400));
  }
  const meals = await mealModel.getMealsByNutritionistId(nutritionistId);
  res.status(200).json({
    status: "success",
    data: {
      meals,
    },
  });
};
const getMealNutritionInfo = async (req, res, next) => {
  const { mealId } = req.params;
  if (!mealId || isNaN(mealId)) {
    return next(new AppError("Please provide a meal id", 400));
  }
  const nutritionFacts = await mealModel.getMealNutritionFacts(mealId);
  res.status(200).json({
    status: "success",
    data: {
      nutritionFacts,
    },
  });
};

const removeIngredientFromMeal = async (req, res, next) => {
  const { ingredient_id } = req.body;
  const { mealId: meal_id } = req.params;
  await mealModel.removeIngredientFromMeal(meal_id, ingredient_id);
  res.status(200).json({
    status: "success",
    message: "Ingredient removed successfully",
  });
};

const deleteMeal = async (req, res, next) => {
  const { meal_id } = req.body;
  await mealModel.deleteMeal(meal_id);
  res.status(200).json({
    status: "success",
    message: "Meal deleted successfully",
  });
};

module.exports = {
  createMeal: catchAsync(createMeal),
  getMealsNutritionist: catchAsync(getMealsNutritionist),
  getMealNutritionInfo: catchAsync(getMealNutritionInfo),
  deleteMeal: catchAsync(deleteMeal),
  removeIngredientFromMeal: catchAsync(removeIngredientFromMeal),
};
