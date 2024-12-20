const db = require("../db");
const AppError = require("../utils/AppError");

exports.getReviewsByCoachId = async (coachId) => {
  const query = `SELECT r.review_id,r.trainee_id, u.first_name,u.last_name,r.content,r.stars FROM lifta_schema.review r
JOIN lifta_schema.users u ON r.trainee_id = u.user_id
WHERE r.trainer_id = $1`;
  return (await db.query(query, [coachId])).rows;
};
exports.getReviewsByTraineeId = async (traineeId) => {
  const query = `SELECT r.review_id,r.trainer_id, u.first_name,u.last_name,r.content,r.stars FROM lifta_schema.review r
JOIN lifta_schema.users u ON r.trainer_id = u.user_id
WHERE r.trainee_id = $1`;
  return (await db.query(query, [traineeId])).rows;
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
exports.deleteReview = async (reviewId) => {
  const query = `DELETE FROM lifta_schema.review WHERE review_id = $1`;
  return (await db.query(query, [reviewId])).rows[0];
};
