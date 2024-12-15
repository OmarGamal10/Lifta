const { values } = require("lodash");
const db = require("../db");
const AppError = require("../utils/AppError");

exports.createWorkout = async (trainer_id, name, _note, exercises) => {
  try {
    await db.query("BEGIN"); // Start transaction

    // Insert workout
    const workoutQuery = `
      INSERT INTO lifta_schema.workout (trainer_id, name, _note) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `;
    const workout = (await db.query(workoutQuery, [trainer_id, name, _note]))
      .rows[0];

    // Add exercises only if workout creation is successful
    if (exercises && exercises.length > 0) {
      const exerciseQuery = `
        INSERT INTO lifta_schema.workout_exercise (workout_id, exercise_id,sets,reps) 
        VALUES ($1, $2,$3,$4);
      `;

      for (const exercise of exercises) {
        await db.query(exerciseQuery, [
          workout.workout_id,
          exercise.id,
          exercise.sets,
          exercise.reps,
        ]);
      }
    }

    await db.query("COMMIT"); // Commit transaction if all succeeds
    return workout;
  } catch (err) {
    await db.query("ROLLBACK"); // Rollback transaction on error
    if (err.code === "23505") {
      throw new AppError("You already have a workout with this name", 400);
    }
    throw err;
  }
};

exports.getWorkoutsByCoachId = async (coachId) => {
  const query = `SELECT workout_id AS id, name,_note AS note  FROM lifta_schema.workout WHERE trainer_id = $1`;
  return (await db.query(query, [coachId])).rows;
};

exports.getCurrentWorkoutByTraineeId = async (traineeId) => {
  const query = `select * from lifta_schema.workout
where workout_id = (select workout_id from lifta_schema.workouts_schedule
where lifta_schema.workouts_schedule.trainee_id = $1
and day = (select(TRIM(TO_CHAR(current_date,'Day'))::varchar)));`;
  return (await db.query(query, [traineeId])).rows;
};

exports.addDoneWorkout = async (trainee_id, workout_id) => {
  try {
    const query = `INSERT INTO lifta_schema.workout_log VALUES ($1, $2, current_date, true);`;
    const values = [trainee_id, workout_id];

    return await db.query(query, values);
  } catch (err) {
    if (err.code === "23505") {
      throw new AppError("You already have a workout log in this date", 400);
      }
    throw err;
  }
};

exports.assignWorkoutToTrainee = async (trainee_id, workout_id, day) => {
  try {
    const query = `INSERT INTO lifta_schema.workouts_schedule (workout_id,trainee_id,day) VALUES ($1,$2,$3) RETURNING * `;
    return (await db.query(query, [workout_id, trainee_id, day])).rows;
  } catch (err) {
    if (err.code === "23505") {
      throw new AppError("Trainee already have a workout on this day", 400);
      }
    throw err;
  }
};

exports.getCurrentWorkoutStatus = async (trainee_id) => {
  const query = `SELECT "isDone" FROM lifta_schema.workout_log
    WHERE trainee_id = $1 AND date = current_date;`;

  return await db.query(query, [trainee_id]);
 };

exports.getWorkoutsByTraineeId = async (trainee_id) => {
  const query = `SELECT w.workout_id ,w.name,w._note AS note ,ws.day from lifta_schema.workout w 
                JOIN lifta_schema.workouts_schedule ws ON w.workout_id=ws.workout_id 
                WHERE ws.trainee_id=$1 `;
  return (await db.query(query, [trainee_id])).rows;
};

exports.removeWorkoutFromSchedule = async (workout_id, trainee_id) => {
  const query = `DELETE FROM lifta_schema.workouts_schedule WHERE workout_id=$1 AND trainee_id=$2`;
  return (await db.query(query, [workout_id, trainee_id])).rows;
};

exports.removeExerciseFromWorkout = async (workoutId, exerciseId) => {
  const query = `DELETE FROM lifta_schema.workout_exercise WHERE workout_id =$1 AND  exercise_id=$2`;
  return (await db.query(query, [workoutId, exerciseId])).rows;
};

exports.deleteWorkout = async (workoutId) => {
  const query = "DELETE FROM lifta_schema.workout WHERE workout_id = $1 ";
  return (await db.query(query, [workoutId])).rows;
};
