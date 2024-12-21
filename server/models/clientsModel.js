const db = require("../db");
const AppError = require("../utils/AppError");

exports.getAllClients = async (coachId) => {
  const query = `SELECT u.photo, t.trainee_id, u.first_name, u.last_name, p.name, p.package_id, p.type
FROM lifta_schema.trainee t
JOIN lifta_schema.users u
  ON t.trainee_id = u.user_id
JOIN lifta_schema.subscription s
  ON t.trainee_id = s.trainee_id
JOIN lifta_schema.package p
  ON s.package_id = p.package_id
WHERE s.status = 'Active'
  AND (t.coach_id = $1 OR t.nutritionist_id = $1);`;
  return (await db.query(query, [coachId])).rows;
};

exports.removeClient = async (trainee_id, package_id) => {
  console.log(trainee_id, package_id);
  // First Detecting type of the package
  const query1 = `SELECT type FROM lifta_schema.package WHERE package_id = $1;`;
  const result1 = await db.query(query1, [package_id]);
  const type = result1.rows[0].type;

  // Setting subscription state to expired
  const query2 = `UPDATE lifta_schema.subscription s 
                  SET status = 'Expired' 
                  WHERE trainee_id = $1 AND package_id = $2`;
  await db.query(query2, [trainee_id, package_id]);

  // Updating coach_id and nutritionist_id based on package type
  const query3 = `UPDATE lifta_schema.trainee
  SET coach_id = CASE
      WHEN $1 = 'Gym' OR $1 = 'Both' THEN NULL
      ELSE coach_id
      END,
      nutritionist_id = CASE
      WHEN $1 = 'Nutrition' OR $1 = 'Both' THEN NULL
      ELSE nutritionist_id
      END
  WHERE trainee_id = $2;`; // Removed package_id from WHERE condition, as it's not needed

  await db.query(query3, [type, trainee_id]);
};
