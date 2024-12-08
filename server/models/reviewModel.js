const db = require("../db");
const AppError = require("../utils/AppError");

exports.getReviewsByCoachId = async (coachId) => {
  const query = `SELECT content,stars FROM lifta_schema.review WHERE trainer_id = $1`;
  return (await db.query(query, [coachId])).rows;
};
exports.getTotalCoachRate = async (coachId) => {
  const query = `SELECT AVG(stars) FROM lifta_schema.review WHERE trainer_id = $1`;
  return (await db.query(query, [coachId])).rows[0];
};
exports.createReview = async (...values) => {
  console.log(values);
  try {
    const query = `INSERT INTO lifta_schema.review (trainer_id, trainee_id, content, stars) VALUES ($1, $2, $3, $4) RETURNING *;`;
    return (await db.query(query, values)).rows[0];
  } catch (err) {
    // if (err.code === "23505") {
    //   throw new AppError("You already have an review for this ", 400);
    // }
    throw err;
  }
};
