const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const mealModel = require("../models/mealModel");
const { raw } = require("express");
const validator = require("validator");
const createMeal = async (req, res, next) => {
  const { name, nutritionist_id, ingredients, picture } = req.body;

  if (!name || !validator.isAlpha(name.replace(/\s/g, ""))) {
    return next(new AppError("Meal name should contain only letters", 400));
  }
  if (picture && !validator.isURL(picture)) {
    return next(new AppError("Please provide a valid picture", 400));
  }

  const meal = await mealModel.createMeal(
    nutritionist_id,
    name,
    picture,
    ingredients
  );
  console.log(req.body);
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

const assignMealTrainee = async (req, res, next) => {
  const { trainee_id, meal_id, day, type } = req.body;
  if (!trainee_id || isNaN(trainee_id)) {
    return next(new AppError("Please provide a trainee id", 400));
  }

  if (!meal_id || isNaN(meal_id)) {
    return next(new AppError("Please provide a meal id", 400));
  }

  const meal = await mealModel.assignMealToTrainee(
    trainee_id,
    meal_id,
    day,
    type
  );
  res.status(201).json({
    status: "success",
    data: {
      meal,
    },
  });
};

const getMealsTrainee = async (req, res, next) => {
  const { traineeId } = req.params;
  if (!traineeId || isNaN(traineeId)) {
    return next(new AppError("Please provide a trainee id", 400));
  }
  const meals = await mealModel.getMealsByTraineeId(traineeId);
  res.status(200).json({
    status: "success",
    data: {
      meals,
    },
  });
};

const getCurrentMealsByTraineeId = async (req, res, next) => {
  const { traineeId } = req.params;
  if (!traineeId || isNaN(traineeId)) {
    return next(new AppError("Please provide a trainee id", 400));
  }
  const meals = await mealModel.getCurrentMealsByTraineeId(traineeId);
  res.status(200).json({
    status: "success",
    data: {
      meals,
    },
  });
};

const addDoneMeal = async (req, res, next) => {
  const { trainee_id, meal_id, type } = req.body;

  await mealModel.addDoneMeal(trainee_id, meal_id, type);
  res.status(201).json({
    status: "success",
    message: "Good Job!",
  });
};

// const getCurrentMealStatusByType = async (req, res, next) => {
//   const { traineeId, type } = req.params;

//   if (!traineeId || isNaN(traineeId)) {
//     return next(new AppError("Please provide a trainee id", 400));
//   }

//   const isDone = await mealModel.getCurrentMealStatusByType(traineeId, type);
//   res.status(200).json({
//     status: "success",
//     data: {
//       isDone,
//     },
//   });
// };

const removeIngredientFromMeal = async (req, res, next) => {
  const { ingredient_id } = req.body;
  const { mealId: meal_id } = req.params;

  await mealModel.removeIngredientFromMeal(meal_id, ingredient_id);
  res.status(200).json({
    status: "success",
    message: "Ingredient removed successfully",
  });
};

const removeMealFromDiet = async (req, res, next) => {
  const { trainee_id } = req.body;
  const { mealId: meal_id } = req.params;
  console.log(meal_id, trainee_id);
  await mealModel.removeMealFromDiet(meal_id, trainee_id);
  res.status(200).json({
    status: "success",
    message: "Meal removed successfully",
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

const getMealLog = async (req, res, next) => {
  const { traineeId, trainerId } = req.params;
  if (!traineeId || isNaN(traineeId)) {
    return next(new AppError("Please provide a trainee id", 400));
  }

  const rawMeals = await mealModel.getMealLog(traineeId, trainerId);
  const groupedByDate = {}; // date groups, every date has array of meals of that day, where each meal has type , name, total nutrients and array of ingredients
  // i want also if the meal id is the same and the type is different , each of them should be in a different group in the same date
  rawMeals.forEach((meal) => {
    if (!groupedByDate[new Date(meal.date).toISOString()]) {
      groupedByDate[new Date(meal.date).toISOString()] = [];
    }
    // check if meal already exists in the date group
    let meall = groupedByDate[new Date(meal.date).toISOString()].find(
      (m) => m.meal_id === meal.meal_id && m.type === meal.type
    );
    if (!meall) {
      meall = {
        meal_id: meal.meal_id,
        nutritionist_name: meal.nutritionist_name,
        name: meal.meal_name,
        isDone: meal.isDone,
        type: meal.type,
        calories: 0,
        protein: 0,
        carbs: 0,
        fats: 0,
        ingredients: [],
      };
      groupedByDate[new Date(meal.date).toISOString()].push(meall);
    }
    meall.calories += (meal.calories_serving * meal.ingredient_quantity) / 100;
    meall.protein += (meal.protein * meal.ingredient_quantity) / 100;
    meall.carbs += (meal.carb * meal.ingredient_quantity) / 100;
    meall.fats += (meal.fat * meal.ingredient_quantity) / 100;
    meall.ingredients.push(
      `${meal.ingredient_quantity}g ${meal.ingredient_name}`
    );
  });

  //sort by date
  const groupedByDateSorted = Object.keys(groupedByDate).sort((a, b) => {
    return new Date(b) - new Date(a);
  });
  const groupedByDateSortedObj = {};
  groupedByDateSorted.forEach((date) => {
    groupedByDateSortedObj[date] = groupedByDate[date];
  });

  res.status(200).json({
    status: "success",
    data: {
      meals: groupedByDateSortedObj,
    },
  });
};

const removeDoneMeal = async (req, res, next) => {
  const { traineeId, type } = req.params;
  await mealModel.removeDoneMeal(traineeId, type);
  res.status(200).json({
    status: "success",
    message: "Meal is not done",
  });
};

module.exports = {
  createMeal: catchAsync(createMeal),
  getMealsNutritionist: catchAsync(getMealsNutritionist),
  getMealNutritionInfo: catchAsync(getMealNutritionInfo),
  getCurrentMealsByTraineeId: catchAsync(getCurrentMealsByTraineeId),
  addDoneMeal: catchAsync(addDoneMeal),
  // getCurrentMealStatusByType: catchAsync(getCurrentMealStatusByType),
  deleteMeal: catchAsync(deleteMeal),
  removeIngredientFromMeal: catchAsync(removeIngredientFromMeal),
  assignMealTrainee: catchAsync(assignMealTrainee),
  getMealsTrainee: catchAsync(getMealsTrainee),
  removeMealFromDiet: catchAsync(removeMealFromDiet),
  getMealLog: catchAsync(getMealLog),
  removeDoneMeal: catchAsync(removeDoneMeal),
};
