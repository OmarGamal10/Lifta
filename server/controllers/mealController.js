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

module.exports = {
  createMeal: catchAsync(createMeal),
  getMealsNutritionist: catchAsync(getMealsNutritionist),
};
