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

exports.getCurrentMealsByTraineeId = async (traineeId) => {
  const query = `SELECT m.meal_id, m.name, m.picture, md.type, SUM(i.carb*mi.quantity/100) AS carb ,
SUM(i.protein*mi.quantity/100) AS protein ,
SUM(i.fat*mi.quantity/100) AS fat,
SUM(i.calories_serving*mi.quantity/100) AS calories,
(SELECT ml."isDone" FROM lifta_schema.meal_log ml 
WHERE ml.trainee_id = $1 AND ml.date = current_date AND ml.type = md.type)
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
      throw new AppError(
        "You already have a meal log with this type in this date",
        400
      );
    }
    throw err;
  }
};

exports.assignMealToTrainee = async (
  trainee_id,
  meal_id,
  day,
  type,
  newMeal
) => {
  try {
    // Check if a meal already exists for the given trainee, day, and type
    const existingMeal = await db.query(
      `SELECT * FROM lifta_schema.meals_diet WHERE trainee_id = $1 AND day = $2 AND type = $3`,
      [trainee_id, day, type]
    );

    let query;

    if (existingMeal.rows.length > 0) {
      // Update the existing meal
      query = `UPDATE lifta_schema.meals_diet SET meal_id = $1 WHERE trainee_id = $2 AND day = $3 AND type = $4 RETURNING *`;
      console.log("Updating an existing meal for the day and type");
      newMeal.new = false;
    } else {
      // Insert a new meal
      query = `INSERT INTO lifta_schema.meals_diet (meal_id, trainee_id, day, type) VALUES ($1, $2, $3, $4) RETURNING *`;
      console.log("Inserting a new meal for the day and type");
      newMeal.new = true;
    }

    // Execute the query and return the result
    return (await db.query(query, [meal_id, trainee_id, day, type])).rows[0];
  } catch (err) {
    if (err.code === "23505") {
      throw new AppError(`Trainee already has a ${type} meal on this day`, 400);
    }
    throw err;
  }
};
// exports.getCurrentMealStatusByType = async (trainee_id, type) => {
//   const query = `SELECT "isDone" FROM lifta_schema.meal_log
//     WHERE trainee_id = $1 AND type = $2 AND date = current_date;`;

//   return await db.query(query, [trainee_id, type]);
// };

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

exports.getMealLog = async (traineeId, trainerId) => {
  const query = `
    SELECT 
        ml.date,
        ml.type,
        m.meal_id,
        m.name as meal_name,
        i.name as ingredient_name,
        mi.quantity as ingredient_quantity,
        i.calories_serving,
        i.protein,
        i.carb,
        i.fat,
        u.first_name || ' ' || u.last_name as nutritionist_name,
        ml."isDone"
      FROM lifta_schema.meal_log ml
      JOIN lifta_schema.meal m ON m.meal_id = ml.meal_id
      JOIN lifta_schema.meal_ingredient mi ON mi.meal_id = m.meal_id
      JOIN lifta_schema.ingredient i ON i.ingredient_id = mi.ingredient_id
      JOIN lifta_schema.users u ON u.user_id = m.nutritionist_id
      WHERE ml.trainee_id = $1
      ${trainerId ? `AND m.nutritionist_id = $2` : ""}
      ORDER BY ml.date DESC, ml.type;`;

  return (
    await db.query(query, trainerId ? [traineeId, trainerId] : [traineeId])
  ).rows;
};

exports.removeDoneMeal = async (trainee_id, type) => {
  const query = `DELETE FROM lifta_schema.meal_log WHERE trainee_id = $1 AND type = $2 AND date = current_date;`;
  return await db.query(query, [trainee_id, type]).rows;
};
