const db = require("../db");
const AppError = require("../utils/AppError");

exports.createMeal = async (nutritionist_id, name, picture, ingredients) => {
  try {
    await db.query("BEGIN"); // Start transaction

    // Insert meal
    const mealQuery = `
      INSERT INTO lifta_schema.meal (nutritionist_id, name, picture) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const meal = (await db.query(mealQuery, [nutritionist_id, name, picture]))
      .rows[0];

    // Add exercises only if workout creation is successful
    if (ingredients && ingredients.length > 0) {
      const ingredientQuery = `
        INSERT INTO lifta_schema.meal_ingredient (meal_id,ingredient_id,quantity) 
        VALUES ($1,$2,$3);
      `;

      for (const ingredient of ingredients) {
        await db.query(ingredientQuery, [
          meal.meal_id,
          ingredient.ingredient_id,
          ingredient.quantity,
        ]);
      }
    }

    await db.query("COMMIT"); // Commit transaction if all succeeds
    return meal;
  } catch (err) {
    await db.query("ROLLBACK"); // Rollback transaction on error

    throw err;
  }
};

exports.getMealsByNutritionistId = async (nutritionistId) => {
  const query = `SELECT *  FROM lifta_schema.meal WHERE nutritionist_id = $1`;
  return (await db.query(query, [nutritionistId])).rows;
};
