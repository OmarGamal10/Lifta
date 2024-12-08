const db = require("../db");
const AppError = require("../utils/AppError");

exports.getExercisesByCoachId = async (coachId) => {
  const query = `SELECT * FROM lifta_schema.exercise WHERE trainer_id = $1`;
  return (await db.query(query, [coachId])).rows;
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
