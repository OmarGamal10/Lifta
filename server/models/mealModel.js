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
  const query = `SELECT m.meal_id AS id, m.name, m.picture, SUM(i.carb*mi.quantity/100) AS carb ,
SUM(i.protein*mi.quantity/100) AS protein ,
SUM(i.fat*mi.quantity/100) AS fat,
SUM(i.calories_serving*mi.quantity/100) AS calories
FROM lifta_schema.meal_ingredient mi
JOIN lifta_schema.meal m ON m.meal_id = mi.meal_id
JOIN lifta_schema.ingredient i ON i.ingredient_id = mi.ingredient_id 
WHERE m.nutritionist_id=$1 GROUP BY m.meal_id,m.name`;
  return (await db.query(query, [nutritionistId])).rows;
};

exports.getMealNutritionFacts = async (mealId) => {
  const query = `SELECT  SUM(i.carb*mi.quantity/100) AS carb ,
SUM(i.protein*mi.quantity/100) AS protein ,
SUM(i.fat*mi.quantity/100) AS fat,
SUM(i.calories_serving*mi.quantity/100) AS calories
FROM lifta_schema.meal_ingredient mi JOIN
lifta_schema.ingredient i ON i.ingredient_id = mi.ingredient_id WHERE mi.meal_id=$1`;
  return (await db.query(query, [mealId])).rows;
};

exports.assignMealToTrainee = async (trainee_id, meal_id, day, type) => {
  try {
    const query = `INSERT INTO lifta_schema.meals_diet (trainee_id,meal_id,day,type) VALUES ($1,$2,$3,$4) RETURNING * `;
    return (await db.query(query, [trainee_id, meal_id, day, type])).rows;
  } catch (err) {
    if (err.code === "23505") {
      throw new AppError(
        `Trainee already have a ${type} meal on this day`,
        400
      );
    }
    throw err;
  }
};

exports.getMealsByTraineeId = async (trainee_id) => {
  const query = `SELECT m.meal_id ,m.name,m.picture ,md.day,md.type from lifta_schema.meal m 
                JOIN lifta_schema.meals_diet md ON m.meal_id=md.meal_id 
                WHERE md.trainee_id=$1 `;
  return (await db.query(query, [trainee_id])).rows;
};

exports.removeMealFromDiet = async (meal_id, trainee_id) => {
  const query = `DELETE FROM lifta_schema.meals_diet WHERE meal_id=$1 AND trainee_id=$2`;
  return (await db.query(query, [meal_id, trainee_id])).rows;
};

exports.removeIngredientFromMeal = async (meal_id, ingredient_id) => {
  const query = `DELETE FROM lifta_schema.meal_ingredient WHERE meal_id =$1 AND ingredient_id=$2`;
  return (await db.query(query, [meal_id, ingredient_id])).rows;
};

exports.deleteMeal = async (mealId) => {
  const query = "DELETE FROM lifta_schema.meal WHERE meal_id = $1 ";
  return (await db.query(query, [mealId])).rows;
};
