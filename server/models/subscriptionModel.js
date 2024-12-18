const { get } = require("lodash");
const db = require("../db");
const packageModel = require("./packageModel");
const AppError = require("../utils/AppError");

exports.getAllSubscriptions = async () => {
  const query = "SELECT * FROM lifta_schema.subscription;";
  return (await db.query(query)).rows;
};

exports.getDurationBySubscriptionId = async (subscription_id) => {
  const query = `SELECT package.duration FROM lifta_schema.subscription JOIN lifta_schema.package ON subscription.package_id = package.package_id WHERE subscription.subscription_id = $1;`;
  return (await db.query(query, [subscription_id])).rows[0].duration;
};

exports.createSubscription = async (trainee_id, package_id, status) => {
  const query = `INSERT INTO lifta_schema.subscription (trainee_id, package_id ,status) VALUES ($1, $2, $3) RETURNING *;`;
  return (await db.query(query, [trainee_id, package_id, status]))
    .rows[0];
};

exports.subscriptionResponse = async (
  subscription_id,
  response,
  start_date,
  end_date
) => {
  const status = response ? "Active" : "Rejected";
  const query = `UPDATE lifta_schema.subscription SET status = $1, start_date = $2, end_date=$3 WHERE subscription_id = $4 RETURNING *;`;
  return (
    await db.query(query, [status, start_date, end_date, subscription_id])
  ).rows[0];
};

exports.getPendingSubscriptionsByCoachId = async (coachId) => {
  const query = ` SELECT package.name, users.first_name, users.last_name, subscription.subscription_id
                  FROM lifta_schema.subscription 
                  JOIN lifta_schema.package ON subscription.package_id = package.package_id 
                  JOIN lifta_schema.users ON subscription.trainee_id = users.user_id
                  WHERE package.trainer_id = $1 AND subscription.status = 'Pending';`;
  return (await db.query(query, [coachId])).rows;
};

exports.getTraineeHasGymSubscription = async (traineeId) => {
  const query = `SELECT 1
                 FROM lifta_schema.subscription
                 JOIN lifta_schema.package ON subscription.package_id = package.package_id
                 WHERE subscription.trainee_id = $1 AND type IN ('Gym', 'Both') AND status = 'Active';`;
  return (await db.query(query, [traineeId])).rows;
};

exports.getTraineeHasNutritionSubscription = async (traineeId) => {
  const query = `SELECT 1
                 FROM lifta_schema.subscription
                 JOIN lifta_schema.package
                 ON subscription.package_id = package.package_id
                 WHERE subscription.trainee_id = $1
                 AND type IN ('Nutrition', 'Both')
                 AND status = 'Active';`;
  return (await db.query(query, [traineeId])).rows;
};
exports.deleteAllPendingRequests = async (subscription_id) => {
  // Retrieve the type and trainee_id associated with the subscription
  const { type, trainee_id } = await this.getTraineePackageTypeRequest(subscription_id);
  const query1 = `SELECT package_id FROM lifta_schema.package WHERE type IN ('Both', $1);`;
  const packages = (await db.query(query1, [type])).rows.map(row => row.package_id); // Extract package_ids

  // Query to delete subscriptions
  const query = `
    DELETE FROM lifta_schema.subscription
    WHERE status = 'Pending' AND trainee_id = $1 AND package_id = ANY($2::int[]);
  `;
  await db.query(query, [trainee_id, packages]);
};


exports.getTraineePackageTypeRequest = async (subscription_id) => {
  const query1 = `SELECT s.trainee_id, p1.type
   FROM lifta_schema.subscription s 
   JOIN lifta_schema.package p1 
   ON s.package_id = p1.package_id 
   WHERE s.subscription_id = $1;`;
  const result1 = await db.query(query1, [subscription_id]);
    const type = result1.rows[0].type;
    const trainee_id = result1.rows[0].trainee_id;
    return {type, trainee_id};
}

