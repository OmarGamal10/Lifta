const db = require("../db");
const AppError = require("../utils/AppError");

exports.getExercisesByCoachId = async (coachId) => {
  const query = `SELECT exercise_id AS id,name,description,muscle_group AS muscleGroup, gif_path AS gif FROM lifta_schema.exercise WHERE trainer_id = $1`;
  return (await db.query(query, [coachId])).rows;
};

exports.getExerciseById = async (exId) => {
  const query = `SELECT name,description ,muscle_group AS muscleGroup FROM lifta_schema.exercise WHERE exercise_id = $1`;
  console.log("ablash");
  return (await db.query(query, [exId])).rows[0];
};

exports.createExercise = async (...values) => {
  console.log(values);
  try {
    const query = `INSERT INTO lifta_schema.exercise (trainer_id, name, muscle_group, description, gif_path) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    return (await db.query(query, values)).rows[0];
  } catch (err) {
    if (err.code === "23505") {
      throw new AppError("You already have an ingredient with this name", 400);
    }
    throw err;
  }
};

exports.deleteExercise = async (exerciseId) => {
  const query = "DELETE FROM lifta_schema.exercise WHERE exercise_id = $1 ";
  return (await db.query(query, [exerciseId])).rows;
};

exports.getExercisesByWorkoutId = async (workoutId) => {
  const query = `SELECT e.exercise_id  , e.name,e.description,e.muscle_group AS muscleGroup, e.gif_path AS gif, we.sets, we.reps FROM lifta_schema.exercise e join lifta_schema.workout_exercise we on we.exercise_id =e.exercise_id WHERE we.workout_id = $1`;
  return (await db.query(query, [workoutId])).rows;
};

exports.updateExercise = async (...values) => {
  console.log(values);
  const query = `
  UPDATE lifta_schema.exercise 
  SET name=$1, muscle_group=$2, description=$3
  WHERE exercise_id=$4
`;
  return (await db.query(query, values)).rows;
};
