const db = require("../db");
const AppError = require("../utils/AppError");

exports.getAllPackages = async () => {
  const query = "SELECT * FROM lifta_schema.package;";
  return (await db.query(query)).rows;
};
exports.getPackageById = async (packageId) => {
  const query =
    "SELECT price,duration FROM lifta_schema.package WHERE package_id = $1";
  return (await db.query(query, [packageId])).rows[0];
};
exports.getPackagesByCoachId = async (coachId) => {
  const query = `SELECT * FROM lifta_schema.package WHERE trainer_id = $1`;
  return (await db.query(query, [coachId])).rows;
};

exports.createPackage = async (...values) => {
  try {
    const query =
      "INSERT INTO lifta_schema.package (name, price, trainer_id, duration, type, description, is_active) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;";
    return (await db.query(query, values)).rows[0];
  } catch (err) {
    if (err.code === "23505") {
      throw new AppError("You already have a package with this name", 400);
    }
  }
};
exports.updatePackage = async (...values) => {
  const query =
    "UPDATE lifta_schema.package SET  price = $1, duration = $2 WHERE package_id = $3 RETURNING *;";
  return (await db.query(query, [...values])).rows[0];
};
exports.toggleActiveState = async (pkgId, state) => {
  const query =
    "UPDATE lifta_schema.package SET is_active=$1 WHERE package_id=$2";
  return (await db.query(query, [state, pkgId])).rows[0];
};

exports.deletePackage = async (packageId) => {
  const query = "DELETE FROM lifta_schema.package WHERE package_id = $1 ";
  return (await db.query(query, [packageId])).rows;
};
