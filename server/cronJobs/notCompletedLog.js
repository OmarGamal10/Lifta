const cron = require("node-cron");
const db = require("../db");
const AppError = require("../utils/AppError");

// current day name
const currentDay = new Date().toLocaleDateString("en-US", { weekday: "long" });
console.log(currentDay);
// at 11:59 PM
const missedWorkoutsCronJob = cron.schedule("59 23 * * *", async () => {
  //get from workouts_schedule any workout today that is NOT in workout_log
  //should check if not in with DATE AND TRAINEE_ID because these are the unique keys
  try {
    const query = `SELECT * FROM lifta_schema.workouts_schedule WHERE day = $1 AND workout_id NOT IN (SELECT workout_id FROM lifta_schema.workout_log WHERE date = current_date)`;

    const result = await db.query(query, [currentDay]); //these should be put in the log with isDone = false
    for (let i = 0; i < result.rows.length; i++) {
      const workout = result.rows[i];
      const query = `INSERT INTO lifta_schema.workout_log VALUES ($1, $2, current_date, false);`;
      await db.query(query, [workout.trainee_id, workout.workout_id]);
    }
    console.log("Cron job ran successfully");
  } catch (err) {
    console.error(err);
    return next(new AppError("Error in cron job", 500));
  }
});

const missedMealsCronJob = cron.schedule("59 23 * * *", async () => {
  //same as above but for meals
  try {
    const query = `SELECT * FROM lifta_schema.meals_diet WHERE day = $1 AND meal_id NOT IN (SELECT meal_id FROM lifta_schema.meal_log WHERE date = current_date)`;

    const result = await db.query(query, [currentDay]); //these should be put in the log with isDone = false
    for (let i = 0; i < result.rows.length; i++) {
      const meal = result.rows[i];
      const query = `INSERT INTO lifta_schema.meal_log VALUES ($1, $2, current_date, false);`;
      await db.query(query, [meal.trainee_id, meal.meal_id]);
    }
    console.log("Cron job ran successfully");
  } catch (err) {
    console.error(err);
    return next(new AppError("Error in cron job", 500));
  }
});

missedWorkoutsCronJob.start();
missedMealsCronJob.start();
module.exports = missedWorkoutsCronJob;
