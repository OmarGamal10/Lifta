const { get } = require("lodash");
const db = require("../db");
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
  //check if the trainee already has a subscription active or pending
  const checkQuery = `SELECT * FROM lifta_schema.subscription WHERE trainee_id = $1 AND (status = 'Active' OR status = 'Pending');`;
  const subscription = (await db.query(checkQuery, [trainee_id])).rows[0];
  if (subscription) {
    throw new AppError(
      `You already have ${subscription.status == "Active" ? "an active" : "a pending"} subscription`,
      409
    );
  }
  const query = `INSERT INTO lifta_schema.subscription (trainee_id, package_id,is_active ,status) VALUES ($1, $2, $3, $4) RETURNING *;`;
  return (await db.query(query, [trainee_id, package_id, false, status]))
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
