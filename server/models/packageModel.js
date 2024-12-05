const db = require("../db");

exports.getAllPackages = async () => {
  const query = "SELECT * FROM lifta_schema.package;";
  return (await db.query(query)).rows;
};

exports.getPackagesByCoachId = async (coachId) => {
  const query = `SELECT * FROM lifta_schema.package WHERE trainer_id = $1`;
  return (await db.query(query, [coachId])).rows;
};
