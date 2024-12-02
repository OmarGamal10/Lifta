const db = require("../db");

exports.getPackagesByCoachId = async (coachId) => {
  const query = `SELECT * FROM lifta_schema.package WHERE trainer_id = ${coachId};`;
  return (await db.query(query)).rows;
};
