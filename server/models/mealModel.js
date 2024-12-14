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

exports.getMealNutritionFacts = async (mealId) => {
  const query = `SELECT  SUM(i.carb*mi.quantity/100) AS carb ,
SUM(i.protein*mi.quantity/100) AS protein ,
SUM(i.fat*mi.quantity/100) AS fat,
SUM(i.calories_serving*mi.quantity/100) AS calories
FROM lifta_schema.meal_ingredient mi JOIN
lifta_schema.ingredient i ON i.ingredient_id = mi.ingredient_id WHERE mi.meal_id=$1`;
  return (await db.query(query, [mealId])).rows;
};

exports.getCurrentMealsByTraineeId = async (traineeId) => {
  const query = `SELECT m.meal_id, m.name, m.picture, md.type, SUM(i.carb*mi.quantity/100) AS carb ,
SUM(i.protein*mi.quantity/100) AS protein ,
SUM(i.fat*mi.quantity/100) AS fat,
SUM(i.calories_serving*mi.quantity/100) AS calories
FROM lifta_schema.meal_ingredient mi
JOIN lifta_schema.meal m ON m.meal_id = mi.meal_id
JOIN lifta_schema.ingredient i ON i.ingredient_id = mi.ingredient_id 
JOIN lifta_schema.meals_diet md ON mi.meal_id = md.meal_id
WHERE md.trainee_id = $1 and md.day = (select(TRIM(TO_CHAR(current_date,'Day'))::varchar))
group by m.meal_id, md.type
`;
  return (await db.query(query, [traineeId])).rows;
};

exports.addDoneMeal = async (trainee_id, meal_id, type) => {
  try {
    const query = `INSERT INTO lifta_schema.meal_log VALUES ($1, $2, current_date, true, $3);`;
    const values = [trainee_id, meal_id, type];

    return await db.query(query, values);
  } catch (err) {
    if (err.code === "23505") {
      throw new AppError("You already have a meal log with this type in this date", 400);
    }
    throw err;
  }
};

exports.getCurrentMealStatusByType = async (trainee_id, type) => {
  const query = `SELECT "isDone" FROM lifta_schema.meal_log
    WHERE trainee_id = $1 AND type = $2 AND date = current_date;`;

  return await db.query(query, [trainee_id, type]);
};