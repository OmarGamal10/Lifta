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

exports.addtoWorkoutLog = async (trainee_id, workout_id) => {
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

exports.assignWorkoutToTrainee = async (
  trainee_id,
  workout_id,
  day,
  newWorkout
) => {
  const existingWorkout = await db.query(
    `SELECT * FROM lifta_schema.workouts_schedule WHERE trainee_id = $1 AND day = $2`,
    [trainee_id, day]
  );
  let query;
  if (existingWorkout.rows.length > 0) {
    query = `UPDATE lifta_schema.workouts_schedule SET workout_id = $1 WHERE trainee_id = $2 AND day = $3 RETURNING *`;
    console.log("updating an existing workout for the day");
    newWorkout.new = false;
  } else {
    query = `INSERT INTO lifta_schema.workouts_schedule (workout_id, trainee_id, day) VALUES ($1, $2, $3) RETURNING *`;
    console.log("inserting a new workout for the day");
    newWorkout.new = true;
  }
  return (await db.query(query, [workout_id, trainee_id, day])).rows[0];
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

exports.getWorkoutLog = async (traineeId) => {
  const query = ` SELECT l.trainee_id, w.workout_id, w.name, w._note, l.date, l."isDone", u.first_name, u.last_name,
                  json_agg(json_build_object('name', e.name, 'description', e.description, 'id',  e.exercise_id, 'musclegroup',  e.muscle_group, 'sets', we.sets, 'reps', we.reps)) AS exercises
                  FROM lifta_schema.workout_log l
                  JOIN lifta_schema.workout w ON w.workout_id = l.workout_id
                  JOIN lifta_schema.workout_exercise we ON we.workout_id = w.workout_id
                  JOIN lifta_schema.exercise e ON e.exercise_id = we.exercise_id
                  JOIN lifta_schema.users u ON u.user_id = w.trainer_id
                  WHERE trainee_id = $1
                  GROUP BY l.trainee_id, w.workout_id, l.date, u.first_name, u.last_name
                  ORDER BY date DESC;`;
  //not necessary to group by workout_id because we have only one workout per day, but for future use if we ever need it
  return (await db.query(query, [traineeId])).rows;
};

exports.markWorkoutAsDone = async (trainee_id, workout_id, date) => {
  const query = `UPDATE lifta_schema.workout_log SET "isDone" = true WHERE trainee_id = $1 AND workout_id = $2 AND date = $3`;
  return await db.query(query, [trainee_id, workout_id, date]);
  // same here workout id is not necessary but for future use if we ever need it (multiple workouts per date)
};
