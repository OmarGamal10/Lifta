const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const ingredientModel = require("../models/ingredientModel");

const getIngredientsCoach = async (req, res, next) => {
  const { coachId } = req.params;
  if (!coachId || isNaN(coachId)) {
    return next(new AppError("Please provide a coach id", 400));
  }
  const packages = await ingredientModel.getIngredientsByCoachId(coachId);
  res.status(200).json({
    status: "success",
    data: {
      packages,
    },
  });
};

const createIngredient = async (req, res, next) => {
  const { name, protein, carb, trainer_id, fat, calories } = req.body;

  if (isNaN(Number(protein)) || Number(protein) <= 0) {
    return next(new AppError("Please provide a valid protien", 400));
  }
  if (isNaN(Number(carb)) || Number(carb) <= 0) {
    return next(new AppError("Please provide a valid carb", 400));
  }
  if (isNaN(Number(fat)) || Number(fat) <= 0) {
    return next(new AppError("Please provide a valid fat", 400));
  }
  if (isNaN(Number(calories)) || Number(calories) <= 0) {
    return next(new AppError("Please provide a valid calories", 400));
  }
  const ingredient = await ingredientModel.createIngredient(
    trainer_id,
    name,
    protein,
    carb,
    fat,
    calories
  );
  res.status(201).json({
    status: "success",
    data: {
      ingredient,
    },
  });
};

module.exports = {
  getIngredientsCoach: catchAsync(getIngredientsCoach),
  createIngredient: catchAsync(createIngredient),
};
