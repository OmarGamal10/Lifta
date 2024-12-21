const db = require("../db");
const AppError = require("../utils/AppError");

exports.getCertificatesByCoachId = async (coachId) => {
  const query = `SELECT * FROM lifta_schema.certificate WHERE trainer_id = $1`;
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

exports.editCertificate = async (...values) => {
  console.log(values);
  try {
    const query = `UPDATE lifta_schema.certificate SET trainer_id = $2, title = $3, description = $4, date_issued = $5, photo = $6 WHERE certificate_id = $1 RETURNING *;`;
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

exports.deleteCertificate = async (certId) => {
  try {
    const query = `DELETE FROM lifta_schema.certificate WHERE certificate_id = $1;`;
    await db.query(query, [certId]);
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