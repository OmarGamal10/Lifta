const db = require("../db");
const AppError = require("../utils/AppError");

exports.getIngredientsByCoachId = async (coachId) => {
  const query = `SELECT  ingredient_id AS id,name,calories_serving AS calories,carb,fat,protein FROM lifta_schema.ingredient WHERE trainer_id = $1`;
  return (await db.query(query, [coachId])).rows;
};

exports.createIngredient = async (...values) => {
  console.log(values);
  try {
    const query = `INSERT INTO lifta_schema.ingredient (trainer_id, name, protein, carb, fat, calories_serving) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    return (await db.query(query, values)).rows[0];
  } catch (err) {
    if (err.code === "23505") {
      throw new AppError("You already have an ingredient with this name", 400);
    }
    throw err;
  }
};

exports.deleteIngredient = async (ingredientId) => {
  const query = "DELETE FROM lifta_schema.ingredient WHERE ingredient_id = $1 ";
  return (await db.query(query, [ingredientId])).rows;
};

exports.getExercisesByMealId = async (mealId) => {
  const query = `SELECT i.ingredient_id , i.name,i.calories_serving,i.carb ,i.fat,i.protein , i.trainer_id  FROM lifta_schema.ingredient i join lifta_schema.meal_ingredient mi on mi.ingredient_id =i.ingredient_id WHERE mi.meal_id = $1`;
  return (await db.query(query, [mealId])).rows;
};
