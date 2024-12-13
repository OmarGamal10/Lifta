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
  const query = `SELECT name,_note AS note  FROM lifta_schema.workout WHERE trainer_id = $1`;
  return (await db.query(query, [coachId])).rows;
};

exports.removeExerciseFromWorkout = async (workoutId, exerciseId) => {
  const query = `DELETE FROM lifta_schema.workout_exercise WHERE workout_id =$1 AND  exercise_id=$2`;
  return (await db.query(query, [workoutId, exerciseId])).rows;
};

exports.deleteWorkout = async (workoutId) => {
  const query = "DELETE FROM lifta_schema.workout WHERE workout_id = $1 ";
  return (await db.query(query, [workoutId])).rows;
};
