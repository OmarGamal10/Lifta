const db = require("../db");
const AppError = require("../utils/AppError");

exports.getIngredientsByCoachId = async (coachId) => {
  const query = `SELECT * FROM lifta_schema.ingredient WHERE trainer_id = $1`;
  return (await db.query(query, [coachId])).rows;
};

exports.createIngredient = async (...values) => {
  console.log(values);
  try {
    const query = `INSERT INTO lifta_schema.Ingredient (trainer_id, name, protein, carb, fat, calories_serving) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;
    return (await db.query(query, values)).rows[0];
  } catch (err) {
    if (err.code === "23505") {
      throw new AppError("You already have an ingredient with this name", 400);
    }
    throw err;
  }
};
