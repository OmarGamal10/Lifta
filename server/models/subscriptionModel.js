const { get } = require("lodash");
const db = require("../db");

exports.getAllSubscriptions = async () => {
  const query = "SELECT * FROM lifta_schema.subscription;";
  return (await db.query(query)).rows;
};
