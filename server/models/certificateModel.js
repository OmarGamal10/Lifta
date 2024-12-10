const db = require("../db");
const AppError = require("../utils/AppError");

exports.getCertificatesByCoachId = async (coachId) => {
  const query = `SELECT title,photo,description,date_issued FROM lifta_schema.certificate WHERE trainer_id = $1`;
  return (await db.query(query, [coachId])).rows;
};

exports.createCertificate = async (...values) => {
  console.log(values);
  try {
    const query = `INSERT INTO lifta_schema.certificate (trainer_id, title, description, date_issued,photo) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    return (await db.query(query, values)).rows[0];
  } catch (err) {
    if (err.code === "23505") {
      throw new AppError(
        "You already have an certificate with this title",
        400
      );
    }
    throw err;
  }
};
