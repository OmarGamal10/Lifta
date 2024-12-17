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
  const query = `INSERT INTO lifta_schema.subscription (trainee_id, package_id ,status) VALUES ($1, $2, $3) RETURNING *;`;
  return (await db.query(query, [trainee_id, package_id, status])).rows[0];
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
                WHERE subscription.trainee_id = $1 AND type = 'Gym' AND (status = 'Pending' OR status = 'Active');`;
  return (await db.query(query, [traineeId])).rows;
};

exports.getTraineeHasNutritionSubscription = async (traineeId) => {
  const query = `SELECT 1
                FROM lifta_schema.subscription
                JOIN lifta_schema.package ON subscription.package_id = package.package_id
                WHERE subscription.trainee_id = $1 AND type = 'Nutrition' AND (status = 'Pending' OR status = 'Active');`;
  return (await db.query(query, [traineeId])).rows;
};

exports.getTraineesWithActiveSubscription = async (Id, type) => {
  const getTrainersQuery = `
    SELECT 
      users.first_name, 
      users.last_name,
      users.user_id,
      package.package_id,
      package.name, 
      package.type,
      subscription.subscription_id,
      subscription.status,
      (
        SELECT content 
        FROM lifta_schema.message 
        WHERE 
        (subscription_id = subscription.subscription_id)
        AND (sender_id = users.user_id AND receiver_id = $1) 
        OR (sender_id = $1 AND receiver_id = users.user_id) 
        ORDER BY time DESC LIMIT 1
      ) AS last_message
    FROM lifta_schema.subscription 
    JOIN lifta_schema.package ON subscription.package_id = package.package_id 
    JOIN lifta_schema.users ON package.trainer_id = users.user_id
    WHERE subscription.trainee_id = $1 AND subscription.status = 'Active' or subscription.status='Expired'
    order by subscription.status, users.user_id; `;

  const getTraineesQuery = `
    SELECT 
      users.first_name, 
      users.last_name,
      users.user_id,
      package.package_id,
      package.name, 
      package.type,
      subscription.subscription_id,
      subscription.status,
      (
        SELECT content 
        FROM lifta_schema.message 
        WHERE 
        (subscription_id = subscription.subscription_id)
        AND (sender_id = users.user_id AND receiver_id = $1) 
        OR (sender_id = $1 AND receiver_id = users.user_id) 
        ORDER BY time DESC LIMIT 1
      ) AS last_message
    FROM lifta_schema.subscription 
    JOIN lifta_schema.package ON subscription.package_id = package.package_id 
    JOIN lifta_schema.users ON subscription.trainee_id = users.user_id
    WHERE package.trainer_id = $1 AND subscription.status = 'Active' or subscription.status='Expired'
    ORDER BY subscription.status , users.user_id;
  `;

  return type === "Trainer"
    ? (await db.query(getTraineesQuery, [Id])).rows
    : (await db.query(getTrainersQuery, [Id])).rows;
};
